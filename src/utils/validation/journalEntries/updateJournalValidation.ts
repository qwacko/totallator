import { z } from "zod";

import { journalFilter } from "./getJournalValidation";

export const updateJournalInputData = z.object({
  //Basic Information
  description: z.string().optional(),
  date: z.date().optional(),
  amount: z.number().optional(),

  //Account
  accountId: z.string().cuid().optional(),

  //Other Journals
  otherJournals: z
    .array(
      z.object({
        id: z.string().cuid(),
        amount: z.number().optional(),
        accountId: z.string().cuid().optional()
      })
    )
    .optional(),

  //Linked Items
  billId: z.string().cuid().nullable().optional(),
  budgetId: z.string().cuid().nullable().optional(),
  categoryId: z.string().cuid().nullable().optional(),
  tagId: z.string().cuid().nullable().optional(),

  //Status
  reconciled: z.boolean().optional(),
  dataChecked: z.boolean().optional(),
  complete: z.boolean().optional()
});

export type UpdateJournalDataInputType = z.infer<typeof updateJournalInputData>;

export const updateJournalInput = z.object({
  data: updateJournalInputData,
  filters: z.array(journalFilter).optional(),
  updateCompleteJournals: z.boolean().optional().default(false),
  maxUpdated: z.number().optional().default(20)
});
