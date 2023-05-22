import { z } from "zod";

import { importAccountSingleValidation } from "../account/importAccountValidation";
import { importBillSingleValidation } from "../bill/importBillValidation";
import { importBudgetSingleValidation } from "../budget/importBudgetValidation";
import { importCategorySingleValidation } from "../category/importCategoryValidation";
import { importJournalEntrySingleValidation } from "../journalEntries/importJournalEntriesValidation";
import { importTagSingleValidation } from "../tag/importTagValidation";

const accountGroupingImportValidation = z.object({
  accountGroupingId: z.string().cuid(),
  journalEntries: z.array(importJournalEntrySingleValidation).optional(),
  accounts: z.array(importAccountSingleValidation).optional(),
  categories: z.array(importCategorySingleValidation).optional(),
  bills: z.array(importBillSingleValidation).optional(),
  budgets: z.array(importBudgetSingleValidation).optional(),
  tags: z.array(importTagSingleValidation).optional()
});

export type AccountGroupingImportValidationType = z.infer<
  typeof accountGroupingImportValidation
>;
