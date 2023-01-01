import type { Budget, Prisma, PrismaClient } from "@prisma/client";
import { type BulkUpgradeAccountGroupingValidationType } from "../bulkUpdateAccountGrouping";
import { type UpsertReturnType } from "../types";
import { upsertBudget, type UpsertBudgetData } from "./upsertBudget";

export type UpsertBudgetsReturnType = UpsertReturnType<Budget>;

export const upsertBudgets = async ({
  data,
  prisma,
  userId,
  userIsAdmin,
}: {
  data: BulkUpgradeAccountGroupingValidationType;
  prisma: PrismaClient | PrismaClient | Prisma.TransactionClient;
  userId: string;
  userIsAdmin?: boolean;
}): Promise<UpsertBudgetsReturnType> => {
  const accountGroupingId = data.accountGroupingId;

  const returnData: UpsertBudgetsReturnType = {
    idLookup: {},
    nameLookup: {},
  };

  const listData: UpsertBudgetData[] = data.createBudgetTitles
    ? data.createBudgetTitles.map((item) => ({ title: item }))
    : [];

  const upsertData = data.upsertBudgets ? data.upsertBudgets : [];

  const list: (typeof upsertData[0] | UpsertBudgetData)[] = [
    ...upsertData,
    ...listData,
  ];
  if (list) {
    await Promise.all(
      list.map(async (currentItem) => {
        const upsertedBudget = await upsertBudget({
          prisma,
          accountGroupingId,
          id:
            "id" in currentItem && currentItem.id ? currentItem.id : undefined,
          data: currentItem,
          userId,
          userAdmin: userIsAdmin,
          action: "Upsert",
        });
        returnData.idLookup[upsertedBudget.id] = upsertedBudget;
        if ("id" in currentItem && currentItem.id) {
          returnData.idLookup[currentItem.id] = upsertedBudget;
        }
        returnData.nameLookup[upsertedBudget.title] = upsertedBudget;
      })
    );
  }

  return returnData;
};
