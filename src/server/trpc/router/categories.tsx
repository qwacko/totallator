import type { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createCategoryValidation } from "src/utils/validation/category/createCategoryValidation";
import { getCategoryInputValidation } from "src/utils/validation/category/getCategoryInputValidation";
import { updateCategoryValidation } from "src/utils/validation/category/updateCategoryValidation";

import { protectedProcedure, router } from "../trpc";
import { categorySortToOrderBy } from "./helpers/categories/categorySortToOrderBy";
import { upsertCategory } from "./helpers/categories/upsertCategory";
import {
  accountGroupingFilter,
  checkAccountGroupingAccess
} from "./helpers/checkAccountGroupingAccess";
import { getUserInfo } from "./helpers/getUserInfo";

export const categoryRouter = router({
  get: protectedProcedure
    .input(getCategoryInputValidation)
    .query(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      //Pagination
      const take = input.pagination.pageSize;
      const skip = input.pagination.pageNo * input.pagination.pageSize;

      const where: Prisma.CategoryWhereInput = {
        AND: [
          { accountGrouping: { viewUsers: { some: { id: user.id } } } },
          ...(input.filters ? input.filters : [])
        ]
      };

      const categories = await ctx.prisma.category.findMany({
        where,
        orderBy: categorySortToOrderBy(input.sort),
        take,
        skip,
        include: {
          accountGrouping: { include: { adminUsers: true } },
          _count: { select: { journalEntries: true } }
        }
      });

      const count = await ctx.prisma.category.count({ where });

      const processedData = categories.map((category) => {
        const { accountGrouping, ...otherData } = category;
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
          includeOnlyAdmin: z.boolean().optional().default(false),
          showCombined: z.boolean().optional().default(true)
        })
        .optional()
        .default({})
    )
    .query(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const categories = await ctx.prisma.category.findMany({
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

      const returnData = categories
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((item) =>
          input.showCombined
            ? { label: item.title, value: item.id }
            : { label: item.single, group: item.group, value: item.id }
        );

      return returnData;
    }),
  create: protectedProcedure
    .input(createCategoryValidation)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      await checkAccountGroupingAccess({
        accountGroupingId: input.accountGroupingId,
        prisma: ctx.prisma,
        user,
        adminRequired: true
      });

      await upsertCategory({
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
    .input(updateCategoryValidation)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      await upsertCategory({
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

      const targetCategory = await ctx.prisma.category.findFirst({
        where: {
          id: input.id,
          ...accountGroupingFilter(user.id)
        }
      });

      if (!targetCategory) {
        throw new TRPCError({
          message: "Cannot find category or user doesn't have admin accces",
          code: "FORBIDDEN"
        });
      }

      await upsertCategory({
        userId: user.id,
        userAdmin: user.admin,
        prisma: ctx.prisma,
        data: { ...targetCategory, single: `${targetCategory.single} (Clone)` },
        action: "Create",
        accountGroupingId: targetCategory.accountGroupingId
      });

      return true;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const targetCategory = await ctx.prisma.category.findFirst({
        where: {
          id: input.id,
          ...accountGroupingFilter(user.id)
        },
        include: { _count: { select: { journalEntries: true } } }
      });

      if (!targetCategory) {
        throw new TRPCError({
          message: "Cannot find category or user doesn't have admin accces",
          code: "FORBIDDEN"
        });
      }
      if (targetCategory._count.journalEntries > 0) {
        throw new TRPCError({
          message: "Cannot remove category that has journal entries associated",
          code: "FORBIDDEN"
        });
      }
      await ctx.prisma.category.delete({
        where: { id: targetCategory.id }
      });

      return true;
    })
});
