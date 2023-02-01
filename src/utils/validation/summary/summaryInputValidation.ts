import { z } from "zod";

import { journalFilter } from "../journalEntries/getJournalValidation";

export const summaryInputValidation = z.object({
  filters: z.array(journalFilter),
  groupingList: z
    .array(
      z.enum([
        "date",
        "accountId",
        "accountGroupingId",
        "tagId",
        "categoryId",
        "billId",
        "budgetId",
        "reconciled",
        "dataChecked",
        "complete"
      ])
    )
    .default(["date"])
});

export type SummaryInputValidationType = z.infer<typeof summaryInputValidation>;
