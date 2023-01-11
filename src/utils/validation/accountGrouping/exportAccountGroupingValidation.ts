import { z } from "zod";

import { accountSingleValidation } from "../account/readAccountValidation";
import { billSingleValidation } from "../bill/readBillValidation";
import { budgetSingleValidation } from "../budget/readBudgetValidation";
import { categorySingleValidation } from "../category/readCategoryValidation";
import { journalEntrySingleValidation } from "../journalEntries/readJournalEntriesValidation";
import { tagSingleValidation } from "../tag/readTagValidation";
import { accountGroupingSingleValidation } from "./readAccountGroupingValidation";

export const accountGroupingExportValidation = z.object({
  accountGrouping: accountGroupingSingleValidation,
  journalEntries: z.array(journalEntrySingleValidation),
  accounts: z.array(accountSingleValidation),
  categories: z.array(categorySingleValidation),
  bills: z.array(billSingleValidation),
  budgets: z.array(budgetSingleValidation),
  tags: z.array(tagSingleValidation)
});

export type AccountGroupingExportValidationType = z.infer<
  typeof accountGroupingExportValidation
>;
