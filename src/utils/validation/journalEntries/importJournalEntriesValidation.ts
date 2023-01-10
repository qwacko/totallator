import { z } from "zod";

export const importJournalEntrySingleValidation = z.object({
  id: z.string().optional(),
  date: z.date(),
  description: z.string(),
  linked: z.boolean().optional(),
  dataChecked: z.boolean().optional(),
  reconciled: z.boolean().optional(),
  complete: z.boolean().optional(),
  amount: z.number(),
  accountId: z.string(),
  billId: z.string().optional().nullable(),
  budgetId: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  tagId: z.string().optional().nullable(),
  transactionId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type importJournalEntrySingleValidationType = z.infer<
  typeof importJournalEntrySingleValidation
>;
