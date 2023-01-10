import { router, protectedProcedure } from "../trpc";
import { getUserInfo } from "./helpers/getUserInfo";
import {
  accountGroupingFilter,
  checkAccountGroupingAccess,
} from "./helpers/checkAccountGroupingAccess";
import { TRPCError } from "@trpc/server";
import { createAccountValidation } from "src/utils/validation/account/createAccountValidation";
import { updateAccountValidation } from "src/utils/validation/account/updateAccountValidation";
import { z } from "zod";
import { upsertAccount } from "./helpers/accounts/upsertAccount";
import { omit } from "lodash";
import { accountGetValidation } from "src/utils/validation/account/readAccountValidation";

export const accountRouter = router({
  get: protectedProcedure
    .output(accountGetValidation)
    .query(async ({ ctx }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const accounts = await ctx.prisma.transactionAccount.findMany({
        where: {
          accountGrouping: { viewUsers: { some: { id: user.id } } },
        },
        include: {
          accountGrouping: { include: { viewUsers: true, adminUsers: true } },
          _count: { select: { journalEntries: true } },
        },
      });

      return accounts.map((account) => {
        const { accountGrouping, ...pickedAccount } = account;

        const userIsAdmin =
          user.admin ||
          accountGrouping.adminUsers.map((item) => item.id).includes(user.id);

        return {
          ...pickedAccount,
          userIsAdmin,
        };
      });
    }),
  create: protectedProcedure
    .input(createAccountValidation)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      await checkAccountGroupingAccess({
        accountGroupingId: input.accountGroupingId,
        prisma: ctx.prisma,
        user,
        adminRequired: true,
      });

      await upsertAccount({
        userId: user.id,
        userAdmin: user.admin,
        action: "Create",
        data: input,
        accountGroupingId: input.accountGroupingId,
        prisma: ctx.prisma,
      });

      return true;
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
        id: input.id,
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
          ...accountGroupingFilter(user.id),
        },
      });

      if (!targetAccount) {
        throw new TRPCError({
          message: "Cannot find account or user doesn't have admin accces",
          code: "FORBIDDEN",
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
          title: `${targetAccountProps.title} (Clone)`,
        },
        action: "Create",
        prisma: ctx.prisma,
        userId: user.id,
        userAdmin: user.admin,
        accountGroupingId: targetAccount.accountGroupingId,
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
          ...accountGroupingFilter(user.id),
        },
        include: { _count: { select: { journalEntries: true } } },
      });

      if (!targetAccount) {
        throw new TRPCError({
          message: "Cannot find account or user doesn't have admin accces",
          code: "FORBIDDEN",
        });
      }
      if (targetAccount._count.journalEntries > 0) {
        throw new TRPCError({
          message: "Cannot remove account that has journal entries associated",
          code: "FORBIDDEN",
        });
      }
      await ctx.prisma.transactionAccount.delete({
        where: { id: targetAccount.id },
      });

      return true;
    }),
});
