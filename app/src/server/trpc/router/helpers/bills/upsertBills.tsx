import type { Bill, Prisma, PrismaClient } from "@prisma/client";
import { type BulkUpgradeAccountGroupingValidationType } from "../bulkUpdateAccountGrouping";
import { type UpsertReturnType } from "../types";
import { upsertBill, type UpsertBillData } from "./upsertBill";

export type UpsertBillsReturnType = UpsertReturnType<Bill>;

export const upsertBills = async ({
  data,
  prisma,
  userId,
  userIsAdmin,
}: {
  data: BulkUpgradeAccountGroupingValidationType;
  prisma: PrismaClient | PrismaClient | Prisma.TransactionClient;
  userId: string;
  userIsAdmin?: boolean;
}): Promise<UpsertBillsReturnType> => {
  const accountGroupingId = data.accountGroupingId;

  const returnData: UpsertBillsReturnType = {
    idLookup: {},
    nameLookup: {},
  };

  const listData: UpsertBillData[] = data.createBillTitles
    ? data.createBillTitles.map((item) => ({ title: item }))
    : [];

  const upsertData = data.upsertBills ? data.upsertBills : [];

  const list: (typeof upsertData[0] | UpsertBillData)[] = [
    ...upsertData,
    ...listData,
  ];
  if (list) {
    await Promise.all(
      list.map(async (currentItem) => {
        const upsertedBill = await upsertBill({
          prisma,
          accountGroupingId,
          id:
            "id" in currentItem && currentItem.id ? currentItem.id : undefined,
          data: currentItem,
          userId,
          userAdmin: userIsAdmin,
          action: "Upsert",
        });
        returnData.idLookup[upsertedBill.id] = upsertedBill;
        if ("id" in currentItem && currentItem.id) {
          returnData.idLookup[currentItem.id] = upsertedBill;
        }
        returnData.nameLookup[upsertedBill.title] = upsertedBill;
      })
    );
  }

  return returnData;
};
