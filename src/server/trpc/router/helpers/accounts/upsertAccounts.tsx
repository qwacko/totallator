import type { Prisma, PrismaClient, TransactionAccount } from "@prisma/client";
import { omit } from "lodash";
import { type BulkUpgradeAccountGroupingValidationType } from "src/utils/validation/accountGrouping/bulkUpgradeAccountGroupingValidation";
import { type UpsertReturnType } from "./../types";
import { createAccountLinkedItems } from "./createAccountLinkedItems";
import { populateRemainingIds } from "../populateRemainingIds";
import { upsertAccount } from "./upsertAccount";
import { buildSearchIDList } from "../buildSearchIDList";

export type UpsertAccountsReturnType = UpsertReturnType<TransactionAccount>;

//Needs to return a list of accounts to create, and mappings between accounts to create and account ids in journals.
export const upsertAccounts = async ({
  data,
  prisma,
  userId,
  userIsAdmin,
}: {
  data: BulkUpgradeAccountGroupingValidationType;
  prisma: PrismaClient | PrismaClient | Prisma.TransactionClient;
  userId: string;
  userIsAdmin?: boolean;
}): Promise<UpsertAccountsReturnType> => {
  const accountGroupingId = data.accountGroupingId;

  //Create Accounts From 'createAccounts'
  const returnData: UpsertAccountsReturnType = {
    idLookup: {},
    nameLookup: {},
    allLookup: {},
  };

  const listData = createAccountLinkedItems({
    createAssetAccounts: data.createAssetAccountTitles,
    createExpenseAccounts: data.createExpenseAccountTitles,
    createIncomeAccounts: data.createIncomeAccountTitles,
    createLiabilityAccounts: data.createLiabilityAccountTitles,
    accountGroupingId,
  });

  const list = [...(data.upsertAccounts || []), ...listData.accountCreationAll];
  if (list) {
    await Promise.all(
      list.map(async (currentItem) => {
        const upsertedAccount = await upsertAccount({
          prisma,
          id:
            "id" in currentItem && currentItem.id ? currentItem.id : undefined,
          data: omit(currentItem, "id"),
          userId,
          userAdmin: userIsAdmin,
          action: "Upsert",
          accountGroupingId,
        });
        returnData.idLookup[upsertedAccount.id] = upsertedAccount;
        if ("id" in currentItem && currentItem.id) {
          returnData.idLookup[currentItem.id] = upsertedAccount;
        }
        returnData.nameLookup[
          upsertedAccount.accountTitleCombined || upsertedAccount.title
        ] = upsertedAccount;
      })
    );
  }

  returnData.allLookup = { ...returnData.idLookup, ...returnData.idLookup };

  await populateRemainingIds({
    returnData,
    idList: buildSearchIDList({ data, key: "accountId" }),
    itemsType: "Accounts",
    getMatching: async (ids) =>
      await prisma.transactionAccount.findMany({
        where: { id: { in: ids }, accountGroupingId },
      }),
  });

  return returnData;
};
