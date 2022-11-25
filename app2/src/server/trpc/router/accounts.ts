import { router, protectedProcedure } from "../trpc";
import {
  basicStatusToDB,
  basicStatusToDBRequired,
} from "src/utils/validation/basicStatusToDB";
import { getUserInfo } from "./helpers/getUserInfo";
import {
  accountGroupingFilter,
  checkAccountGroupingAccess,
} from "./helpers/checkAccountGroupingAccess";
import { TRPCError } from "@trpc/server";
import { createAccountValidation } from "src/utils/validation/account/createAccountValidation";
import { updateAccountValidation } from "src/utils/validation/account/updateAccountValidation";
import {
  createAccountGroupTitle,
  updateAccountGroupTitle,
} from "./helpers/accountTitleGroupHandling";
import { z } from "zod";

const defaultIncExp = (title: string) => {
  return {
    title: title,
    accountGroup: null,
    accountGroup2: null,
    accountGroup3: null,
    accountGroupCombined: null,
    accountTitleCombined: title,
    startDate: null,
    endDate: null,
    isCash: true,
    isNetWorth: true,
  };
};

export const accountRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

    const accounts = await ctx.prisma.transactionAccount.findMany({
      where: {
        accountGrouping: { viewUsers: { some: { id: user.id } } },
      },
      include: {
        accountGrouping: { include: { viewUsers: true, adminUsers: true } },
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

      const { title, accountGroup, accountGroup2, accountGroup3, ...other } =
        input;

      if (input.type === "Income" || input.type === "Expense") {
        await ctx.prisma.transactionAccount.create({
          data: {
            ...other,
            ...basicStatusToDBRequired("Active"),
            ...defaultIncExp(input.title),
          },
        });
      } else {
        await ctx.prisma.transactionAccount.create({
          data: {
            ...other,
            ...basicStatusToDBRequired("Active"),
            ...createAccountGroupTitle({
              title,
              accountGroup,
              accountGroup2,
              accountGroup3,
            }),
          },
        });
      }

      return true;
    }),
  update: protectedProcedure
    .input(updateAccountValidation)
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

      const {
        title,
        accountGroup,
        accountGroup2,
        accountGroup3,
        status,
        accountGroupCombined,
        ...other
      } = input.data;

      const isIncExp = other.type
        ? other.type === "Expense" || other.type === "Income"
        : targetAccount.type === "Expense" || targetAccount.type === "Income";

      if (isIncExp) {
        await ctx.prisma.transactionAccount.update({
          where: { id: targetAccount.id },
          data: {
            ...other,
            ...basicStatusToDB(status),
            ...defaultIncExp(title || targetAccount.title),
          },
        });
      } else {
        await ctx.prisma.transactionAccount.update({
          where: { id: targetAccount.id },
          data: {
            ...other,
            ...basicStatusToDB(status),
            ...updateAccountGroupTitle({
              title,
              accountGroup,
              accountGroup2,
              accountGroup3,
              existing: targetAccount,
              accountGroupCombined: accountGroupCombined || undefined,
            }),
          },
        });
      }

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

      const { createdAt, updatedAt, id, ...targetAccountProps } = targetAccount;

      await ctx.prisma.transactionAccount.create({
        data: {
          ...targetAccountProps,
          title: `${targetAccountProps.title} (Clone)`,
          accountTitleCombined: `${targetAccountProps.accountTitleCombined} (Clone)`,
        },
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
