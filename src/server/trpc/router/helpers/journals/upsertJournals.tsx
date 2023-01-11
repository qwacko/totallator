import type { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { omit } from "lodash";

import { removeUndefinedAndDuplicates } from "src/utils/arrayHelpers";
import type { UpsertJournalsValidationType } from "src/utils/validation/journalEntries/upsertJournalValidation";

import type { UpsertAccountsReturnType } from "../accounts/upsertAccounts";
import type { UpsertBillsReturnType } from "../bills/upsertBills";
import type { UpsertBudgetsReturnType } from "../budgets/upsertBudgets";
import type { UpsertCategoriesReturnType } from "../categories/upsertCategories";
import type { UserInfo } from "../getUserInfo";
import type { UpsertTagsReturnType } from "../tags/upsertTags";
import type { UpsertReturnType } from "../types";
import { createTransaction } from "./createTransaction";
import { updateSingleJournal } from "./updateSingleJournal";

export const upsertJournals = async ({
  prisma,
  data,
  accountInfo,
  billInfo,
  budgetInfo,
  categoryInfo,
  tagInfo,
  accountGroupingId,
  user
}: {
  prisma: PrismaClient | Prisma.TransactionClient;
  data: UpsertJournalsValidationType;
  accountInfo: UpsertAccountsReturnType;
  billInfo: UpsertBillsReturnType;
  budgetInfo: UpsertBudgetsReturnType;
  categoryInfo: UpsertCategoriesReturnType;
  tagInfo: UpsertTagsReturnType;
  accountGroupingId: string;
  user: UserInfo;
}) => {
  const internalData = data;

  //Checek Account Info AccountGroupings
  const accountGroupingIdsAccounts = removeUndefinedAndDuplicates(
    Object.keys(accountInfo.allLookup)
      .map((key) => accountInfo.allLookup[key])
      .map((item) => item?.accountGroupingId)
  );

  if (accountGroupingIdsAccounts.length > 1) {
    throw new TRPCError({
      message: `More than one account grouping id found. ${accountGroupingIdsAccounts.join(
        "|"
      )}`,
      code: "INTERNAL_SERVER_ERROR"
    });
  }
  if (accountGroupingIdsAccounts[0] !== accountGroupingId) {
    throw new TRPCError({
      message: `Account Grouping Ids Don't Match. account = ${accountGroupingIdsAccounts[0]}. Request = ${accountGroupingId}`,
      code: "INTERNAL_SERVER_ERROR"
    });
  }

  //Add the corrected Information to the journals
  const processedData: UpsertJournalsValidationType = internalData.map(
    (journal) => {
      const accountId = findLinked({
        data: accountInfo,
        id: journal.accountId,
        required: true,
        title: "Account"
      });
      if (!accountId) {
        throw new TRPCError({
          message: "Account Id Is Blank",
          code: "INTERNAL_SERVER_ERROR"
        });
      }
      const billId = findLinked({
        data: billInfo,
        id: journal.billId,
        required: false,
        title: "Bill"
      });
      const budgetId = findLinked({
        data: budgetInfo,
        id: journal.budgetId,
        required: false,
        title: "Budget"
      });
      const categoryId = findLinked({
        data: categoryInfo,
        id: journal.categoryId,
        required: false,
        title: "Category"
      });
      const tagId = findLinked({
        data: tagInfo,
        id: journal.tagId,
        required: false,
        title: "Tag"
      });

      return { ...journal, accountId, billId, budgetId, categoryId, tagId };
    }
  );

  const journalIds = removeUndefinedAndDuplicates(
    processedData.map((item) => item.id)
  );
  const journalsToUpdate = await prisma.journalEntry.findMany({
    where: { id: { in: journalIds }, accountGroupingId }
  });
  const journalIdsToUpdate = journalsToUpdate.map((item) => item.id);
  const inputJournalsToUpdate = processedData.filter((item) =>
    item.id ? journalIdsToUpdate.includes(item.id) : false
  );
  const inputJournalsToCreate = processedData.filter((item) =>
    item.id ? !journalIdsToUpdate.includes(item.id) : true
  );

  //Update the target Journals
  await Promise.all(
    inputJournalsToUpdate.map(async (journal) => {
      const currentJournal = journalsToUpdate.find(
        (item) => item.id === journal.id
      );
      if (!currentJournal) {
        throw new TRPCError({
          message: "Shouldn't Happen - 123",
          code: "INTERNAL_SERVER_ERROR"
        });
      }
      if (currentJournal.transactionId !== journal.transactionId) {
        throw new TRPCError({
          message: `Transaction ID of jouirnal ${journal.id} doesn't match database`,
          code: "BAD_REQUEST"
        });
      }
      await updateSingleJournal({
        prisma,
        journal: currentJournal,
        data: omit(journal, "id", "transactionId"),
        updateCompleted: true
      });
    })
  );

  //Create Transactions As Well
  const transactionIds = removeUndefinedAndDuplicates(
    inputJournalsToCreate.map((item) => item.transactionId)
  );

  await Promise.all(
    transactionIds.map(async (transactionId) => {
      const journals = inputJournalsToCreate.filter(
        (item) => item.transactionId === transactionId
      );
      if (journals.length < 2) {
        throw new TRPCError({
          message: `Transaction Id ${transactionId} has less than two journals`,
          code: "BAD_REQUEST"
        });
      }

      const transactionData = journals.map((item) => ({
        ...omit(item, "id", "transactionId"),
        accountGroupingId
      }));

      await createTransaction({ prisma, input: transactionData, user });
    })
  );
};

const findLinked = <T extends { [key: string]: unknown; id: string }>({
  data,
  id,
  required = false,
  title
}: {
  data: UpsertReturnType<T>;
  id: string | undefined;
  required?: boolean;
  title: string;
}) => {
  if (required && !id) {
    throw new TRPCError({
      message: `${title} not found but is required - ${id}`,
      code: "INTERNAL_SERVER_ERROR"
    });
  }

  if (id) {
    const item = data.allLookup[id];
    if (!item) {
      throw new TRPCError({
        message: `${title} ${id} not found`,
        code: "INTERNAL_SERVER_ERROR"
      });
    }
    return item.id;
  } else {
    return undefined;
  }
};
