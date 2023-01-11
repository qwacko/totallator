import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createBillValidation } from "src/utils/validation/bill/createBillValidation";
import { billGetValidation } from "src/utils/validation/bill/readBillValidation";
import { updateBillValidation } from "src/utils/validation/bill/updateBillValidation";

import { protectedProcedure, router } from "../trpc";
import { upsertBill } from "./helpers/bills/upsertBill";
import {
  accountGroupingFilter,
  checkAccountGroupingAccess
} from "./helpers/checkAccountGroupingAccess";
import { getUserInfo } from "./helpers/getUserInfo";

export const billRouter = router({
  get: protectedProcedure.output(billGetValidation).query(async ({ ctx }) => {
    const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

    const bills = await ctx.prisma.bill.findMany({
      where: {
        accountGrouping: { viewUsers: { some: { id: user.id } } }
      },
      include: {
        accountGrouping: { include: { viewUsers: true, adminUsers: true } },
        _count: { select: { journalEntries: true } }
      }
    });

    return bills.map((bill) => {
      const { accountGrouping, ...pickedBill } = bill;
      const userIsAdmin =
        user.admin ||
        accountGrouping.adminUsers.map((item) => item.id).includes(user.id);

      return { ...pickedBill, userIsAdmin };
    });
  }),
  create: protectedProcedure
    .input(createBillValidation)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      await checkAccountGroupingAccess({
        accountGroupingId: input.accountGroupingId,
        prisma: ctx.prisma,
        user,
        adminRequired: true
      });

      await upsertBill({
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
    .input(updateBillValidation)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      await upsertBill({
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

      const targetBill = await ctx.prisma.bill.findFirst({
        where: {
          id: input.id,
          ...accountGroupingFilter(user.id)
        }
      });

      if (!targetBill) {
        throw new TRPCError({
          message: "Cannot find bill or user doesn't have admin accces",
          code: "FORBIDDEN"
        });
      }

      await upsertBill({
        userId: user.id,
        userAdmin: user.admin,
        prisma: ctx.prisma,
        data: { ...targetBill, title: `${targetBill.title} (Clone)` },
        action: "Create",
        accountGroupingId: targetBill.accountGroupingId
      });

      return true;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const targetBill = await ctx.prisma.bill.findFirst({
        where: {
          id: input.id,
          ...accountGroupingFilter(user.id)
        },
        include: { _count: { select: { journalEntries: true } } }
      });

      if (!targetBill) {
        throw new TRPCError({
          message: "Cannot find bill or user doesn't have admin accces",
          code: "FORBIDDEN"
        });
      }
      if (targetBill._count.journalEntries > 0) {
        throw new TRPCError({
          message: "Cannot remove bill that has journal entries associated",
          code: "FORBIDDEN"
        });
      }
      await ctx.prisma.bill.delete({
        where: { id: targetBill.id }
      });

      return true;
    })
});
