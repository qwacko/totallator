import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { basicStatusToDB } from "src/utils/validation/basicStatusToDB";
import { getUserInfo } from "./getUserInfo";
import { PrismaStatusEnumValidation } from "./PrismaStatusEnumValidation";
import { TRPCError } from "@trpc/server";
import { checkAccountGroupingAccess } from "./checkAccountGroupingAccess";
import { createAccountGroupingValidation } from "src/utils/validation/accountGrouping/createAccountGroupingValidation";

export const accountGroupingRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

    const data = await ctx.prisma.accountGrouping.findMany({
      //   where: user.admin ? { viewUsers: { some: { id: user.id } } } : {},
      include: { viewUsers: true, adminUsers: true },
    });

    return data.map((item) => {
      const adminUserIds = item.adminUsers.map((user) => user.id);
      const filteredViewUsers = item.viewUsers.filter(
        (user) => !adminUserIds.includes(user.id)
      );
      const users = [
        ...item.adminUsers.map((item) => ({
          id: item.id,
          name: item.name,
          username: item.username,
          isUser: item.id === user.id,
          admin: true,
        })),
        ...filteredViewUsers.map((item) => ({
          id: item.id,
          name: item.name,
          username: item.username,
          isUser: item.id === user.id,
          admin: false,
        })),
      ];

      const pickedItems = {
        id: item.id,
        active: item.active,
        status: item.status,
        allowUpdate: item.allowUpdate,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        deleted: item.deleted,
        disabled: item.disabled,
        title: item.title,
      };
      const userIsAdmin = item.adminUsers
        .map((item) => item.id)
        .includes(user.id);
      return { ...pickedItems, userIsAdmin, users };
    });
  }),
  create: protectedProcedure
    .input(createAccountGroupingValidation)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.accountGrouping.create({
        data: {
          title: input.title,
          ...basicStatusToDB("Active"),
          adminUsers: { connect: { id: ctx.session.user.id } },
          viewUsers: { connect: { id: ctx.session.user.id } },
        },
      });
      return true;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        data: z.object({
          title: z.string().optional(),
          status: PrismaStatusEnumValidation.optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const result = await ctx.prisma.accountGrouping.updateMany({
        where: {
          id: input.id,
          ...(user.admin ? {} : { adminUsers: { some: { id: user.id } } }),
        },
        data: {
          title: input.data.title,
          ...basicStatusToDB(input.data.status),
        },
      });

      if (result.count === 0) {
        throw new TRPCError({
          message: "No Account Grouping Updated",
          code: "BAD_REQUEST",
        });
      }

      return true;
    }),
  addUser: protectedProcedure
    .input(
      z
        .object({
          userId: z.string().cuid().optional(),
          username: z.string().optional(),
          accountGroupingId: z.string().cuid(),
        })
        .refine((data) => data.userId || data.username, {
          message: "Must have either a userId or username",
          path: ["userId"],
        })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      await checkAccountGroupingAccess({
        prisma: ctx.prisma,
        accountGroupingId: input.accountGroupingId,
        user,
      });

      const targetUser = await ctx.prisma.user.findFirst({
        where: { id: input.userId, username: input.username },
      });

      if (!targetUser) {
        throw new TRPCError({ message: "User Not Found", code: "NOT_FOUND" });
      }

      await ctx.prisma.accountGrouping.update({
        where: { id: input.accountGroupingId },
        data: {
          viewUsers: {
            connect: { id: targetUser.id },
          },
        },
      });

      return true;
    }),
  removeUser: protectedProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
        accountGroupingId: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);
      if (input.userId === user.id) {
        throw new TRPCError({
          message: "User Cannot Edit Their Own Permissions",
          code: "FORBIDDEN",
        });
      }

      await checkAccountGroupingAccess({
        prisma: ctx.prisma,
        accountGroupingId: input.accountGroupingId,
        user,
      });

      await ctx.prisma.accountGrouping.update({
        where: { id: input.accountGroupingId },
        data: {
          viewUsers: { disconnect: { id: input.userId } },
          adminUsers: { disconnect: { id: input.userId } },
        },
      });

      return true;
    }),
  setUserAdmin: protectedProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
        accountGroupingId: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);
      if (input.userId === user.id) {
        throw new TRPCError({
          message: "User Cannot Edit Their Own Permissions",
          code: "FORBIDDEN",
        });
      }

      await checkAccountGroupingAccess({
        prisma: ctx.prisma,
        accountGroupingId: input.accountGroupingId,
        user,
      });

      await ctx.prisma.accountGrouping.update({
        where: { id: input.accountGroupingId },
        data: {
          viewUsers: { connect: { id: input.userId } },
          adminUsers: { connect: { id: input.userId } },
        },
      });

      return true;
    }),
  setUserView: protectedProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
        accountGroupingId: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);
      if (input.userId === user.id) {
        throw new TRPCError({
          message: "User Cannot Edit Their Own Permissions",
          code: "FORBIDDEN",
        });
      }

      await checkAccountGroupingAccess({
        prisma: ctx.prisma,
        accountGroupingId: input.accountGroupingId,
        user,
      });

      await ctx.prisma.accountGrouping.update({
        where: { id: input.accountGroupingId },
        data: {
          viewUsers: { disconnect: { id: input.userId } },
          adminUsers: { connect: { id: input.userId } },
        },
      });

      return true;
    }),
});