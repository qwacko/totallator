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
import { createBillValidation } from "src/utils/validation/bill/createBillValidation";
import { updateBillValidation } from "src/utils/validation/bill/updateBillValidation";
import { TRPCError } from "@trpc/server";

export const billRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

    const bills = await ctx.prisma.bill.findMany({
      where: {
        accountGrouping: { viewUsers: { some: { id: user.id } } },
      },
      include: {
        accountGrouping: { include: { viewUsers: true, adminUsers: true } },
      },
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
        adminRequired: true,
      });

      await ctx.prisma.bill.create({
        data: { ...input, ...basicStatusToDBRequired("Active") },
      });

      return true;
    }),
  update: protectedProcedure
    .input(updateBillValidation)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const targetBill = await ctx.prisma.bill.findFirst({
        where: {
          id: input.id,
          ...accountGroupingFilter(user.id),
        },
      });

      if (!targetBill) {
        throw new TRPCError({
          message: "Cannot find bill or user doesn't have admin accces",
          code: "FORBIDDEN",
        });
      }

      await ctx.prisma.bill.update({
        where: { id: targetBill.id },
        data: { ...input.data, ...basicStatusToDB(input.data.status) },
      });

      return true;
    }),
});