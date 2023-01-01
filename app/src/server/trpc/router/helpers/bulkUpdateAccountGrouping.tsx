import type { Prisma, PrismaClient, User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { createAccountValidation } from "src/utils/validation/account/createAccountValidation";
import { createBillValidation } from "src/utils/validation/bill/createBillValidation";
import { createBudgetValidation } from "src/utils/validation/budget/createBudgetValidation";
import { createCategoryValidation } from "src/utils/validation/category/createCategoryValidation";
import {
  createSimpleTransactionValidation,
  type createSimpleTransactionValidationType,
  createTransactionValidation,
} from "src/utils/validation/journalEntries/createJournalValidation";
import { createTagValidation } from "src/utils/validation/tag/createTagValidation";
import { z } from "zod";
import { upsertAccounts } from "./accounts/upsertAccounts";
import { upsertBills } from "./bills/upsertBills";
import { upsertBudgets } from "./budgets/upsertBudgets";
import { upsertCategories } from "./categories/upsertCategories";
import { upsertTags } from "./tags/upsertTags";
import type { UpsertReturnType } from "./types";
import { createSimpleTranasction } from "./journals/createSimpleTranasction";

const bulkUpdateAccountGroupingValidation = z.object({
  accountGroupingId: z.string().cuid(),
  createIncomeAccountTitles: z.array(z.string()).optional(),
  createExpenseAccountTitles: z.array(z.string()).optional(),
  createAssetAccountTitles: z.array(z.string()).optional(),
  createLiabilityAccountTitles: z.array(z.string()).optional(),
  upsertAccounts: z
    .array(
      createAccountValidation
        .omit({ accountGroupingId: true })
        .merge(z.object({ id: z.string().optional() }))
    )
    .optional(),
  createTagTitles: z.array(z.string()).optional(),
  upsertTags: z
    .array(
      createTagValidation
        .omit({ accountGroupingId: true })
        .merge(z.object({ id: z.string().optional() }))
    )
    .optional(),
  createBillTitles: z.array(z.string()).optional(),
  upsertBills: z
    .array(
      createBillValidation
        .omit({ accountGroupingId: true })
        .merge(z.object({ id: z.string().optional() }))
    )
    .optional(),
  createCategoryTitles: z.array(z.string()).optional(),
  upsertCategories: z
    .array(
      createCategoryValidation
        .omit({ accountGroupingId: true })
        .merge(z.object({ id: z.string().optional() }))
    )
    .optional(),
  createBudgetTitles: z.array(z.string()).optional(),
  upsertBudgets: z
    .array(
      createBudgetValidation
        .omit({ accountGroupingId: true })
        .merge(z.object({ id: z.string().optional() }))
    )
    .optional(),
  createTransactions: z.array(createTransactionValidation).optional(),
  createSimpleTransactions: z
    .array(createSimpleTransactionValidation)
    .optional(),
});

export type BulkUpgradeAccountGroupingValidationType = z.infer<
  typeof bulkUpdateAccountGroupingValidation
>;

const findData = <T extends Record<string, unknown>>(
  data: UpsertReturnType<T>,
  search: string | undefined
) => {
  if (!search) {
    return undefined;
  }
  if (search in data.idLookup && data.idLookup[search]) {
    return data.idLookup[search];
  }
  if (search in data.nameLookup && data.nameLookup[search]) {
    return data.nameLookup[search];
  }

  throw new TRPCError({
    message: "Cannot find item. ID = ${searc}",
    code: "PARSE_ERROR",
  });
};

export const bulkUpdateAccountGrouping = async ({
  prisma,
  input,
  user,
}: {
  prisma: PrismaClient | Prisma.TransactionClient;
  input: BulkUpgradeAccountGroupingValidationType;
  user: User;
}) => {
  const userId = user.id;
  const userIsAdmin = user.admin;

  const accountInfo = await upsertAccounts({
    prisma,
    data: input,
    userId,
    userIsAdmin,
  });

  const categoryInfo = await upsertCategories({
    prisma,
    data: input,
    userId,
    userIsAdmin,
  });

  const billInfo = await upsertBills({
    prisma,
    data: input,
    userId,
    userIsAdmin,
  });

  const budgetInfo = await upsertBudgets({
    prisma,
    data: input,
    userId,
    userIsAdmin,
  });

  const tagInfo = await upsertTags({
    prisma,
    data: input,
    userId,
    userIsAdmin,
  });

  if (
    input.createSimpleTransactions &&
    input.createSimpleTransactions.length > 0
  ) {
    const simpleTransactionsForCreation: createSimpleTransactionValidationType[] =
      input.createSimpleTransactions.map((item) => {
        const bill = findData(billInfo, item.billId);
        const budget = findData(budgetInfo, item.budgetId);
        const category = findData(categoryInfo, item.categoryId);
        const tag = findData(tagInfo, item.tagId);
        const fromAccount = findData(accountInfo, item.fromAccountId);
        const toAccount = findData(accountInfo, item.toAccountId);

        if (!fromAccount) {
          throw new TRPCError({
            message: `From Account Not Found. id = ${item.fromAccountId}`,
            code: "INTERNAL_SERVER_ERROR",
          });
        }

        if (!toAccount) {
          throw new TRPCError({
            message: `To Account Not Found. id = ${item.toAccountId}`,
            code: "INTERNAL_SERVER_ERROR",
          });
        }

        return {
          ...item,
          billId: bill ? bill.id : undefined,
          budgetId: budget ? budget.id : undefined,
          categoryId: category ? category.id : undefined,
          tagId: tag ? tag.id : undefined,
          accountGroupingId: input.accountGroupingId,
          fromAccountId: fromAccount.id,
          toAccountId: toAccount.id,
        };
      });

    await Promise.all(
      simpleTransactionsForCreation.map(async (trans) =>
        createSimpleTranasction({ user, prisma, input: trans })
      )
    );
  }
};
