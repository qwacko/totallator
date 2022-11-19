import { router, protectedProcedure } from "../trpc";
import {
  basicStatusToDB,
  basicStatusToDBRequired,
} from "src/utils/validation/basicStatusToDB";
import { getUserInfo } from "./getUserInfo";
import {
  accountGroupingFilter,
  checkAccountGroupingAccess,
} from "./checkAccountGroupingAccess";
import { createBudgetValidation } from "src/utils/validation/budget/createBudgetValidation";
import { updateBudgetValidation } from "src/utils/validation/budget/updateBudgetValidation";
import { TRPCError } from "@trpc/server";

export const budgetRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

    const budgets = await ctx.prisma.budget.findMany({
      where: {
        accountGrouping: { viewUsers: { some: { id: user.id } } },
      },
      include: {
        accountGrouping: { include: { viewUsers: true, adminUsers: true } },
      },
    });

    return budgets.map((budget) => {
      const { accountGrouping, ...pickedBudget } = budget;
      const userIsAdmin =
        user.admin ||
        accountGrouping.adminUsers.map((item) => item.id).includes(user.id);

      return { ...pickedBudget, userIsAdmin };
    });
  }),
  create: protectedProcedure
    .input(createBudgetValidation)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      await checkAccountGroupingAccess({
        accountGroupingId: input.accountGroupingId,
        prisma: ctx.prisma,
        user,
        adminRequired: true,
      });

      await ctx.prisma.budget.create({
        data: { ...input, ...basicStatusToDBRequired("Active") },
      });

      return true;
    }),
  update: protectedProcedure
    .input(updateBudgetValidation)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const targetBudget = await ctx.prisma.budget.findFirst({
        where: {
          id: input.id,
          ...accountGroupingFilter(user.id),
        },
      });

      if (!targetBudget) {
        throw new TRPCError({
          message: "Cannot find budget or user doesn't have admin accces",
          code: "FORBIDDEN",
        });
      }

      await ctx.prisma.budget.update({
        where: { id: targetBudget.id },
        data: { ...input.data, ...basicStatusToDB(input.data.status) },
      });

      return true;
    }),
});