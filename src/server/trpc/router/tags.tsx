import type { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { removeUndefinedAndDuplicates } from "src/utils/arrayHelpers";
import { createTagValidation } from "src/utils/validation/tag/createTagValidation";
import { getTagInputValidation } from "src/utils/validation/tag/getTagInputValidation";
import { updateTagValidation } from "src/utils/validation/tag/updateTagValidation";

import { protectedProcedure, router } from "../trpc";
import {
  accountGroupingFilter,
  checkAccountGroupingAccess
} from "./helpers/checkAccountGroupingAccess";
import { getUserInfo } from "./helpers/getUserInfo";
import { tagSortToOrderBy } from "./helpers/tags/tagSortToOrderBy";
import { upsertTag } from "./helpers/tags/upsertTag";

export const tagRouter = router({
  get: protectedProcedure
    .input(getTagInputValidation)
    .query(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      //Pagination
      const take = input.pagination.pageSize;
      const skip = input.pagination.pageNo * input.pagination.pageSize;

      const where: Prisma.TagWhereInput = {
        AND: [
          { accountGrouping: { viewUsers: { some: { id: user.id } } } },
          ...(input.filters ? input.filters : [])
        ]
      };
      const tags = await ctx.prisma.tag.findMany({
        where,
        orderBy: tagSortToOrderBy(input.sort),
        take,
        skip,
        include: {
          accountGrouping: { include: { adminUsers: true } },
          _count: { select: { journalEntries: true } }
        }
      });

      const count = await ctx.prisma.tag.count({ where });

      const processedData = tags.map((tag) => {
        const { accountGrouping, ...otherData } = tag;
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

      const tags = await ctx.prisma.tag.findMany({
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

      const returnData = tags
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((item) =>
          input.showCombined
            ? { label: item.title, value: item.id }
            : { label: item.single, group: item.group, value: item.id }
        );

      return returnData;
    }),
  getGroups: protectedProcedure
    .input(
      z.object({
        accountGroupingId: z.string().optional(),
        includeOnlyAdmin: z.boolean().optional().default(true),
        returnType: z.enum(["group", "single"])
      })
    )
    .query(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const categories = await ctx.prisma.tag.findMany({
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

      return removeUndefinedAndDuplicates(
        categories.map((item) => item[input.returnType])
      ).sort((a, b) =>
        a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase())
      );
    }),
  create: protectedProcedure
    .input(createTagValidation)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      await checkAccountGroupingAccess({
        accountGroupingId: input.accountGroupingId,
        prisma: ctx.prisma,
        user,
        adminRequired: true
      });

      await upsertTag({
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
    .input(updateTagValidation)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      await upsertTag({
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

      const targetTag = await ctx.prisma.tag.findFirst({
        where: {
          id: input.id,
          ...accountGroupingFilter(user.id)
        }
      });

      if (!targetTag) {
        throw new TRPCError({
          message: "Cannot find tag or user doesn't have admin accces",
          code: "FORBIDDEN"
        });
      }
      await upsertTag({
        userId: user.id,
        userAdmin: user.admin,
        prisma: ctx.prisma,
        data: { ...targetTag, single: `${targetTag.single} (Clone)` },
        action: "Create",
        accountGroupingId: targetTag.accountGroupingId
      });

      return true;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const targetTag = await ctx.prisma.tag.findFirst({
        where: {
          id: input.id,
          ...accountGroupingFilter(user.id)
        },
        include: { _count: { select: { journalEntries: true } } }
      });

      if (!targetTag) {
        throw new TRPCError({
          message: "Cannot find tag or user doesn't have admin accces",
          code: "FORBIDDEN"
        });
      }
      if (targetTag._count.journalEntries > 0) {
        throw new TRPCError({
          message: "Cannot remove tag that has journal entries associated",
          code: "FORBIDDEN"
        });
      }
      await ctx.prisma.tag.delete({
        where: { id: targetTag.id }
      });

      return true;
    })
});
