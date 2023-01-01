import { router, protectedProcedure } from "../trpc";
import { getUserInfo } from "./helpers/getUserInfo";
import {
  accountGroupingFilter,
  checkAccountGroupingAccess,
} from "./helpers/checkAccountGroupingAccess";
import { TRPCError } from "@trpc/server";
import { createTagValidation } from "src/utils/validation/tag/createTagValidation";
import { updateTagValidation } from "src/utils/validation/tag/updateTagValidation";
import { z } from "zod";
import { upsertTag } from "./helpers/tags/upsertTag";

export const tagRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

    const tags = await ctx.prisma.tag.findMany({
      where: {
        accountGrouping: { viewUsers: { some: { id: user.id } } },
      },
      include: {
        accountGrouping: { include: { viewUsers: true, adminUsers: true } },
        _count: { select: { journalEntries: true } },
      },
    });

    return tags.map((tag) => {
      const { accountGrouping, ...pickedTag } = tag;
      const userIsAdmin =
        user.admin ||
        accountGrouping.adminUsers.map((item) => item.id).includes(user.id);

      return { ...pickedTag, userIsAdmin };
    });
  }),
  create: protectedProcedure
    .input(createTagValidation)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      await checkAccountGroupingAccess({
        accountGroupingId: input.accountGroupingId,
        prisma: ctx.prisma,
        user,
        adminRequired: true,
      });

      await upsertTag({
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
    .input(updateTagValidation)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      await upsertTag({
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

      const targetTag = await ctx.prisma.tag.findFirst({
        where: {
          id: input.id,
          ...accountGroupingFilter(user.id),
        },
      });

      if (!targetTag) {
        throw new TRPCError({
          message: "Cannot find tag or user doesn't have admin accces",
          code: "FORBIDDEN",
        });
      }
      await upsertTag({
        userId: user.id,
        userAdmin: user.admin,
        prisma: ctx.prisma,
        data: { ...targetTag, single: `${targetTag.single} (Clone)` },
        action: "Create",
        accountGroupingId: targetTag.accountGroupingId,
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
          ...accountGroupingFilter(user.id),
        },
        include: { _count: { select: { journalEntries: true } } },
      });

      if (!targetTag) {
        throw new TRPCError({
          message: "Cannot find tag or user doesn't have admin accces",
          code: "FORBIDDEN",
        });
      }
      if (targetTag._count.journalEntries > 0) {
        throw new TRPCError({
          message: "Cannot remove tag that has journal entries associated",
          code: "FORBIDDEN",
        });
      }
      await ctx.prisma.tag.delete({
        where: { id: targetTag.id },
      });

      return true;
    }),
});
