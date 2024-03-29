import type { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createBudgetValidation } from "src/utils/validation/budget/createBudgetValidation";
import { getBudgetInputValidation } from "src/utils/validation/budget/getBudgetInputValidation";
import { updateBudgetValidation } from "src/utils/validation/budget/updateBudgetValidation";

import { protectedProcedure, router } from "../trpc";
import { budgetSortToOrderBy } from "./helpers/budgets/budgetSortToOrderBy";
import { upsertBudget } from "./helpers/budgets/upsertBudget";
import {
  accountGroupingFilter,
  checkAccountGroupingAccess
} from "./helpers/checkAccountGroupingAccess";
import { getUserInfo } from "./helpers/getUserInfo";

export const budgetRouter = router({
  get: protectedProcedure
    .input(getBudgetInputValidation)
    .query(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      //Pagination
      const take = input.pagination.pageSize;
      const skip = input.pagination.pageNo * input.pagination.pageSize;

      const where: Prisma.BudgetWhereInput = {
        AND: [
          { accountGrouping: { viewUsers: { some: { id: user.id } } } },
          ...(input.filters ? input.filters : [])
        ]
      };
      const budgets = await ctx.prisma.budget.findMany({
        where,
        orderBy: budgetSortToOrderBy(input.sort),
        take,
        skip,
        include: {
          accountGrouping: { include: { adminUsers: true } },
          _count: { select: { journalEntries: true } }
        }
      });

      const count = await ctx.prisma.budget.count({ where });

      const processedData = budgets.map((budget) => {
        const { accountGrouping, ...otherData } = budget;
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
          includeOnlyAdmin: z.boolean().optional().default(false)
        })
        .optional()
        .default({})
    )
    .query(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const budgets = await ctx.prisma.budget.findMany({
        where: {
          AND: [
            {
              accountGrouping: input.includeOnlyAdmin
                ? { adminUsers: { some: { id: user.id } } }
                : { viewUsers: { some: { id: user.id } } }
            },
            input?.accountGroupingId
              ? { accountGroupingId: input.accountGroupingId }
              : {}
          ]
        }
      });

      const returnData = budgets
        .map((item) => ({ label: item.title, value: item.id }))
        .sort((a, b) => a.label.localeCompare(b.label));

      return returnData;
    }),
  create: protectedProcedure
    .input(createBudgetValidation)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      await checkAccountGroupingAccess({
        accountGroupingId: input.accountGroupingId,
        prisma: ctx.prisma,
        user,
        adminRequired: true
      });

      await upsertBudget({
        prisma: ctx.prisma,
        userId: user.id,
        userAdmin: user.admin,
        action: "Create",
        data: input,
        accountGroupingId: input.accountGroupingId
      });
      return true;
    }),
  update: protectedProcedure
    .input(updateBudgetValidation)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      await upsertBudget({
        prisma: ctx.prisma,
        userId: user.id,
        userAdmin: user.admin,
        data: input.data,
        id: input.id,
        action: "Update"
      });

      return true;
    }),
  clone: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const targetBudget = await ctx.prisma.budget.findFirst({
        where: {
          id: input.id,
          ...accountGroupingFilter(user.id)
        }
      });

      if (!targetBudget) {
        throw new TRPCError({
          message: "Cannot find budget or user doesn't have admin accces",
          code: "FORBIDDEN"
        });
      }
      await upsertBudget({
        userId: user.id,
        userAdmin: user.admin,
        prisma: ctx.prisma,
        data: { ...targetBudget, title: `${targetBudget.title} (Clone)` },
        action: "Create",
        accountGroupingId: targetBudget.accountGroupingId
      });
      return true;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const targetBudget = await ctx.prisma.budget.findFirst({
        where: {
          id: input.id,
          ...accountGroupingFilter(user.id)
        },
        include: { _count: { select: { journalEntries: true } } }
      });

      if (!targetBudget) {
        throw new TRPCError({
          message: "Cannot find budget or user doesn't have admin accces",
          code: "FORBIDDEN"
        });
      }
      if (targetBudget._count.journalEntries > 0) {
        throw new TRPCError({
          message: "Cannot remove budget that has journal entries associated",
          code: "FORBIDDEN"
        });
      }

      await ctx.prisma.budget.delete({
        where: { id: targetBudget.id }
      });

      return true;
    })
});
