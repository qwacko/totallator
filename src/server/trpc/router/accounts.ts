import type { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { omit } from "lodash";
import { z } from "zod";

import { createAccountValidation } from "src/utils/validation/account/createAccountValidation";
import { getAccountInputValidation } from "src/utils/validation/account/getAccountInputValidation";
import { updateAccountValidation } from "src/utils/validation/account/updateAccountValidation";

import { protectedProcedure, router } from "../trpc";
import { accountSortToOrderBy } from "./helpers/accounts/accountSortToOrderBy";
import { upsertAccount } from "./helpers/accounts/upsertAccount";
import {
  accountGroupingFilter,
  checkAccountGroupingAccess
} from "./helpers/checkAccountGroupingAccess";
import { getUserInfo } from "./helpers/getUserInfo";

export const accountRouter = router({
  get: protectedProcedure
    .input(getAccountInputValidation)
    .query(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      //Pagination
      const take = input.pagination.pageSize;
      const skip = input.pagination.pageNo * input.pagination.pageSize;

      const where: Prisma.TransactionAccountWhereInput = {
        AND: [
          { accountGrouping: { viewUsers: { some: { id: user.id } } } },
          ...(input.filters ? input.filters : [])
        ]
      };

      const accounts = await ctx.prisma.transactionAccount.findMany({
        where,
        orderBy: accountSortToOrderBy(input.sort),
        take,
        skip,
        include: {
          accountGrouping: { include: { adminUsers: true } }
        }
      });

      const count = await ctx.prisma.transactionAccount.count({ where });

      const processedData = accounts.map((item) => {
        const { accountGrouping, ...otherData } = item;
        return {
          ...otherData,
          userIsAdmin: Boolean(
            accountGrouping.adminUsers.find((agUser) => agUser.id === user.id)
          )
        };
      });
      return { data: processedData, count };
    }),
  getDropdown: protectedProcedure
    .input(
      z
        .object({
          accountGroupingId: z.string().optional(),
          showAccountGroup: z.boolean().optional()
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const accounts = await ctx.prisma.transactionAccount.findMany({
        where: {
          AND: [
            {
              accountGrouping: { adminUsers: { some: { id: user.id } } }
            },
            input?.accountGroupingId
              ? { accountGroupingId: input.accountGroupingId }
              : {}
          ]
        },
        include: {
          accountGrouping: { include: { viewUsers: true, adminUsers: true } },
          _count: { select: { journalEntries: true } }
        }
      });

      const returnData = accounts
        .map((item) => ({
          label:
            input?.showAccountGroup || false
              ? item.accountTitleCombined || item.title
              : item.title,
          group:
            item.type === "Asset" || item.type === "Liability"
              ? item.accountGroupCombined || undefined
              : item.type,
          value: item.id
        }))
        .sort((a, b) =>
          `${a.group}-${a.label}`.localeCompare(`${b.group}-${b.label}`)
        );

      return returnData;
    }),
  create: protectedProcedure
    .input(createAccountValidation)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      await checkAccountGroupingAccess({
        accountGroupingId: input.accountGroupingId,
        prisma: ctx.prisma,
        user,
        adminRequired: true
      });

      const newAccount = await upsertAccount({
        userId: user.id,
        userAdmin: user.admin,
        action: "Create",
        data: input,
        accountGroupingId: input.accountGroupingId,
        prisma: ctx.prisma
      });

      return newAccount;
    }),
  update: protectedProcedure
    .input(updateAccountValidation)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      await upsertAccount({
        userId: user.id,
        userAdmin: user.admin,
        action: "Update",
        prisma: ctx.prisma,
        data: input.data,
        id: input.id
      });

      return true;
    }),
  clone: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const targetAccount = await ctx.prisma.transactionAccount.findFirst({
        where: {
          id: input.id,
          ...accountGroupingFilter(user.id)
        }
      });

      if (!targetAccount) {
        throw new TRPCError({
          message: "Cannot find account or user doesn't have admin accces",
          code: "FORBIDDEN"
        });
      }

      const targetAccountProps = omit(
        targetAccount,
        "id",
        "createdAt",
        "updatedAt",
        "accountGroupCombined",
        "accountTitleCombined",
        "active",
        "allowUpdate",
        "deleted",
        "disabled"
      );

      await upsertAccount({
        data: {
          ...targetAccountProps,
          title: `${targetAccountProps.title} (Clone)`
        },
        action: "Create",
        prisma: ctx.prisma,
        userId: user.id,
        userAdmin: user.admin,
        accountGroupingId: targetAccount.accountGroupingId
      });

      return true;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const targetAccount = await ctx.prisma.transactionAccount.findFirst({
        where: {
          id: input.id,
          ...accountGroupingFilter(user.id)
        },
        include: { _count: { select: { journalEntries: true } } }
      });

      if (!targetAccount) {
        throw new TRPCError({
          message: "Cannot find account or user doesn't have admin accces",
          code: "FORBIDDEN"
        });
      }
      if (targetAccount._count.journalEntries > 0) {
        throw new TRPCError({
          message: "Cannot remove account that has journal entries associated",
          code: "FORBIDDEN"
        });
      }
      await ctx.prisma.transactionAccount.delete({
        where: { id: targetAccount.id }
      });

      return true;
    })
});
