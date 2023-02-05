import { z } from "zod";

import {
  accountGroupingIdValidation,
  createdUpdatedValidation,
  userIsAdminValidation
} from "../returnValidationHelpers";

export const journalEntrySingleValidation = z
  .object({
    id: z.string().cuid(),
    date: z.date(),
    description: z.string(),
    linked: z.boolean(),
    dataChecked: z.boolean(),
    reconciled: z.boolean(),
    complete: z.boolean(),
    amount: z.number(),
    accountId: z.string().cuid(),
    billId: z.string().cuid().optional().nullable(),
    budgetId: z.string().cuid().optional().nullable(),
    categoryId: z.string().cuid().optional().nullable(),
    tagId: z.string().cuid().optional().nullable(),
    transactionId: z.string().cuid()
  })
  .merge(createdUpdatedValidation)
  .merge(accountGroupingIdValidation);

export const journalEntryGetValidation = z
  .object({
    data: z.array(
      journalEntrySingleValidation
        .merge(userIsAdminValidation)
        .merge(
          z.object({
            total: z.number(),
            otherJournals: z.array(
              z.object({
                amount: z.number(),
                accountId: z.string().cuid(),
                id: z.string().cuid()
              })
            )
          })
        )
        .strict()
    ),
    count: z.number()
  })
  .strict();

export type JournalEntryGetValidationType = z.infer<
  typeof journalEntryGetValidation
>;
