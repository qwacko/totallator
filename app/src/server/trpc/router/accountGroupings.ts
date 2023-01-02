import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { basicStatusToDB } from "src/utils/validation/basicStatusToDB";
import { getUserInfo } from "./helpers/getUserInfo";
import { PrismaStatusEnumValidation } from "src/utils/validation/PrismaStatusEnumValidation";
import { TRPCError } from "@trpc/server";
import { checkAccountGroupingAccess } from "./helpers/checkAccountGroupingAccess";
import { createAccountGroupingValidation } from "src/utils/validation/accountGrouping/createAccountGroupingValidation";
import type { Prisma, PrismaClient } from "@prisma/client";
import {
  createPersonalItems,
  createBusinessItems,
} from "./helpers/accountGrouping/seedAccountGroupingItems";

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
  clearLinkedItems: protectedProcedure
    .input(z.object({ accountGroupingId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);
      await checkAccountGroupingAccess({
        prisma: ctx.prisma,
        accountGroupingId: input.accountGroupingId,
        user,
      });

      //Delete All The Linked Items. All done in parallel
      await ctx.prisma.$transaction(async (prisma) => {
        await Promise.all([
          prisma.journalEntry.deleteMany({
            where: { accountGroupingId: input.accountGroupingId },
          }),
          prisma.transactionAccount.deleteMany({
            where: { accountGroupingId: input.accountGroupingId },
          }),
          prisma.category.deleteMany({
            where: { accountGroupingId: input.accountGroupingId },
          }),
          prisma.bill.deleteMany({
            where: { accountGroupingId: input.accountGroupingId },
          }),
          prisma.budget.deleteMany({
            where: { accountGroupingId: input.accountGroupingId },
          }),
          prisma.tag.deleteMany({
            where: { accountGroupingId: input.accountGroupingId },
          }),
        ]);
      });

      return true;
    }),
  delete: protectedProcedure
    .input(z.object({ accountGroupingId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);
      await checkAccountGroupingAccess({
        prisma: ctx.prisma,
        accountGroupingId: input.accountGroupingId,
        user,
      });
      const accountGrouping = await checkCanSeed({
        prisma: ctx.prisma,
        accountGroupingId: input.accountGroupingId,
      });

      if (!accountGrouping) {
        throw new TRPCError({
          message: "Cannot Delete Account Grouping With Linked Items",
          code: "FORBIDDEN",
        });
      }

      await ctx.prisma.accountGrouping.delete({
        where: { id: input.accountGroupingId },
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
  canSeed: protectedProcedure
    .input(z.object({ accountGroupingId: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);
      await checkAccountGroupingAccess({
        prisma: ctx.prisma,
        accountGroupingId: input.accountGroupingId,
        user,
        adminRequired: false,
      });

      const seedingPossible = await checkCanSeed({
        prisma: ctx.prisma,
        accountGroupingId: input.accountGroupingId,
      });

      return seedingPossible ? true : false;
    }),
  seed: protectedProcedure
    .input(
      z.object({
        accountGroupingId: z.string().cuid(),
        transactionCount: z.number().int().optional().default(0),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);
      await checkAccountGroupingAccess({
        prisma: ctx.prisma,
        accountGroupingId: input.accountGroupingId,
        user,
        adminRequired: true,
      });

      const accountGrouping = await checkCanSeed({
        prisma: ctx.prisma,
        accountGroupingId: input.accountGroupingId,
      });

      if (!accountGrouping) {
        throw new TRPCError({
          message:
            "Cannot find account grouping, or account grouping has existing accounts / journal entries / categories / bills / budgets / tags",
          code: "BAD_REQUEST",
        });
      }

      await ctx.prisma.$transaction(async (prisma) => {
        await createPersonalItems({
          user,
          prisma,
          accountGroupingId: accountGrouping.id,
        });
        await createBusinessItems({
          user,
          prisma,
          accountGroupingId: accountGrouping.id,
        });
      });
    }),
});

const checkCanSeed = async ({
  prisma,
  accountGroupingId,
}: {
  prisma: PrismaClient | Prisma.TransactionClient;
  accountGroupingId: string;
}) => {
  const accountGrouping = await prisma.accountGrouping.findUnique({
    where: { id: accountGroupingId },
    include: {
      _count: {
        select: {
          accounts: true,
          journalEntries: true,
          categories: true,
          bills: true,
          budgets: true,
          tags: true,
        },
      },
    },
  });

  if (
    !accountGrouping ||
    accountGrouping._count.accounts > 0 ||
    accountGrouping._count.journalEntries > 0 ||
    accountGrouping._count.categories > 0 ||
    accountGrouping._count.bills > 0 ||
    accountGrouping._count.budgets > 0 ||
    accountGrouping._count.tags > 0
  ) {
    return undefined;
  }

  return accountGrouping;
};
