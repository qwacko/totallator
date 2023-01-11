import { z } from "zod";

import { createAccountValidation } from "src/utils/validation/account/createAccountValidation";
import { createBillValidation } from "src/utils/validation/bill/createBillValidation";
import { createBudgetValidation } from "src/utils/validation/budget/createBudgetValidation";
import { createCategoryValidation } from "src/utils/validation/category/createCategoryValidation";
import {
  createSimpleTransactionValidation,
  createTransactionValidation
} from "src/utils/validation/journalEntries/createJournalValidation";
import { createTagValidation } from "src/utils/validation/tag/createTagValidation";

import { upsertJournalsValidation } from "../journalEntries/upsertJournalValidation";

export const bulkUpdateAccountGroupingValidation = z.object({
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
        .strip()
    )
    .optional(),
  createTagTitles: z.array(z.string()).optional(),
  upsertTags: z
    .array(
      createTagValidation
        .omit({ accountGroupingId: true })
        .merge(z.object({ id: z.string().optional() }))
        .strip()
    )
    .optional(),
  createBillTitles: z.array(z.string()).optional(),
  upsertBills: z
    .array(
      createBillValidation
        .omit({ accountGroupingId: true })
        .merge(z.object({ id: z.string().optional() }))
        .strip()
    )
    .optional(),
  createCategoryTitles: z.array(z.string()).optional(),
  upsertCategories: z
    .array(
      createCategoryValidation
        .omit({ accountGroupingId: true })
        .merge(z.object({ id: z.string().optional() }))
        .strip()
    )
    .optional(),
  createBudgetTitles: z.array(z.string()).optional(),
  upsertBudgets: z
    .array(
      createBudgetValidation
        .omit({ accountGroupingId: true })
        .merge(z.object({ id: z.string().optional() }))
        .strip()
    )
    .optional(),
  createTransactions: z.array(createTransactionValidation).optional(),
  createSimpleTransactions: z
    .array(createSimpleTransactionValidation.strip())
    .optional(),
  upsertJournalEntries: upsertJournalsValidation.optional()
});

export type BulkUpgradeAccountGroupingValidationType = z.infer<
  typeof bulkUpdateAccountGroupingValidation
>;
