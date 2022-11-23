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
import { createTagValidation } from "src/utils/validation/tag/createTagValidation";
import { updateTagValidation } from "src/utils/validation/tag/updateTagValidation";
import {
  createGroupSingleTitle,
  updateGroupSingleTitle,
} from "./helpers/groupSingleHandling";

export const tagRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

    const tags = await ctx.prisma.tag.findMany({
      where: {
        accountGrouping: { viewUsers: { some: { id: user.id } } },
      },
      include: {
        accountGrouping: { include: { viewUsers: true, adminUsers: true } },
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

      await ctx.prisma.tag.create({
        data: {
          accountGroupingId: input.accountGroupingId,
          ...createGroupSingleTitle({
            group: input.group,
            single: input.single,
          }),
          ...basicStatusToDBRequired("Active"),
        },
      });

      return true;
    }),
  update: protectedProcedure
    .input(updateTagValidation)
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

      await ctx.prisma.tag.update({
        where: { id: targetTag.id },
        data: {
          ...updateGroupSingleTitle({
            group: input.data.group,
            single: input.data.single,
            title: input.data.title,
            existing: targetTag,
          }),
          ...basicStatusToDB(input.data.status),
        },
      });

      return true;
    }),
});
