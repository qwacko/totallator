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
        "complete",
        "year",
        "yearMonth",
        "yearMonthDay",
        "yearQuarter",
        "yearWeek"
      ])
    )
    .default(["yearMonthDay"])
});

export type SummaryInputValidationType = z.input<typeof summaryInputValidation>;
