import type { Prisma, PrismaClient } from "@prisma/client";
import { basicStatusToDBRequired } from "src/utils/validation/basicStatusToDB";
import { TRPCError } from "@trpc/server";
import type { UpsertActions } from "../types";
import type { createBillValidationType } from "src/utils/validation/bill/createBillValidation";
import type { updateBillDataValidationType } from "src/utils/validation/bill/updateBillValidation";

type UpsertBillData = createBillValidationType | updateBillDataValidationType;

export const upsertBill = async ({
  data,
  id,
  accountGroupingId,
  userId,
  userAdmin = false,
  prisma,
  action,
}: {
  data: UpsertBillData;
  id?: string | undefined;
  accountGroupingId?: string;
  userId: string;
  userAdmin?: boolean;
  prisma: PrismaClient | PrismaClient | Prisma.TransactionClient;
  action: UpsertActions;
}) => {
  if (id) {
    const found = await prisma.bill.findFirst({
      where: {
        id,
        accountGroupingId,
        ...(!userAdmin
          ? { accountGrouping: { adminUsers: { some: { id: userId } } } }
          : {}),
      },
    });
    if (found && action === "Create") {
      throw new TRPCError({
        message: "Bill Found But Action Is Only Create, cannot update",
        code: "BAD_REQUEST",
      });
    } else if (found) {
      return prisma.bill.update({
        where: { id: found.id },
        data: {
          title: data.title,
          ...(data.status ? basicStatusToDBRequired(data.status) : {}),
        },
      });
    }
  }
  if (action === "Update") {
    throw new TRPCError({
      message: "No bill found to update",
      code: "BAD_REQUEST",
    });
  }
  if (accountGroupingId && data.title) {
    return prisma.bill.create({
      data: {
        title: data.title,
        accountGroupingId,
        ...basicStatusToDBRequired(data.status || "Active"),
      },
    });
  }
  throw new TRPCError({
    message: "Cannot Create Bill Without Account Grouping Or Title",
    code: "BAD_REQUEST",
  });
};
