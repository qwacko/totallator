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

      return { ...pickedAccount, userIsAdmin };
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

      await ctx.prisma.transactionAccount.create({
        data: { ...input, ...basicStatusToDBRequired("Active") },
      });

      return true;
    }),
  update: protectedProcedure
    .input(updateAccountValidation)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const targetAccount = await ctx.prisma.bill.findFirst({
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

      await ctx.prisma.transactionAccount.update({
        where: { id: targetAccount.id },
        data: { ...input.data, ...basicStatusToDB(input.data.status) },
      });

      return true;
    }),
});
