import { router, protectedProcedure } from "../trpc";
import { getUserInfo } from "./helpers/getUserInfo";
import {
  accountGroupingFilter,
  checkAccountGroupingAccess,
} from "./helpers/checkAccountGroupingAccess";
import { TRPCError } from "@trpc/server";
import { createCategoryValidation } from "src/utils/validation/category/createCategoryValidation";
import { updateCategoryValidation } from "src/utils/validation/category/updateCategoryValidation";
import { z } from "zod";
import { upsertCategory } from "./helpers/categories/upsertCategory";
import { categoryGetValidation } from "src/utils/validation/category/readCategoryValidation";

export const categoryRouter = router({
  get: protectedProcedure
    .output(categoryGetValidation)
    .query(async ({ ctx }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const categories = await ctx.prisma.category.findMany({
        where: {
          accountGrouping: { viewUsers: { some: { id: user.id } } },
        },
        include: {
          accountGrouping: { include: { viewUsers: true, adminUsers: true } },
          _count: { select: { journalEntries: true } },
        },
      });

      return categories.map((category) => {
        const { accountGrouping, ...pickedCategory } = category;
        const userIsAdmin =
          user.admin ||
          accountGrouping.adminUsers.map((item) => item.id).includes(user.id);

        return { ...pickedCategory, userIsAdmin };
      });
    }),
  create: protectedProcedure
    .input(createCategoryValidation)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      await checkAccountGroupingAccess({
        accountGroupingId: input.accountGroupingId,
        prisma: ctx.prisma,
        user,
        adminRequired: true,
      });

      await upsertCategory({
        prisma: ctx.prisma,
        userId: user.id,
        userAdmin: user.admin,
        action: "Create",
        data: input,
        accountGroupingId: input.accountGroupingId,
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
        action: "Update",
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
          ...accountGroupingFilter(user.id),
        },
      });

      if (!targetCategory) {
        throw new TRPCError({
          message: "Cannot find category or user doesn't have admin accces",
          code: "FORBIDDEN",
        });
      }

      await upsertCategory({
        userId: user.id,
        userAdmin: user.admin,
        prisma: ctx.prisma,
        data: { ...targetCategory, single: `${targetCategory.single} (Clone)` },
        action: "Create",
        accountGroupingId: targetCategory.accountGroupingId,
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
          ...accountGroupingFilter(user.id),
        },
        include: { _count: { select: { journalEntries: true } } },
      });

      if (!targetCategory) {
        throw new TRPCError({
          message: "Cannot find category or user doesn't have admin accces",
          code: "FORBIDDEN",
        });
      }
      if (targetCategory._count.journalEntries > 0) {
        throw new TRPCError({
          message: "Cannot remove category that has journal entries associated",
          code: "FORBIDDEN",
        });
      }
      await ctx.prisma.category.delete({
        where: { id: targetCategory.id },
      });

      return true;
    }),
});
