import { createAccountValidation } from "src/utils/validation/account/createAccountValidation";
import { createBillValidation } from "src/utils/validation/bill/createBillValidation";
import { createBudgetValidation } from "src/utils/validation/budget/createBudgetValidation";
import { createCategoryValidation } from "src/utils/validation/category/createCategoryValidation";
import {
  createSimpleTransactionValidation,
  createTransactionValidation,
} from "src/utils/validation/journalEntries/createJournalValidation";
import { createTagValidation } from "src/utils/validation/tag/createTagValidation";
import { z } from "zod";

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
