import { z } from "zod";

const idFilter = z.object({ in: z.array(z.string().cuid()) }).optional();

const stringFilter = z
  .object({
    contains: z.string().optional(),
    mode: z
      .enum(["insensitive", "default"] as const)
      .optional()
      .default("insensitive"),
  })
  .optional();

const booleanFilter = z
  .object({ equals: z.boolean().optional(), not: z.boolean().optional() })
  .optional();

const dateFilter = z
  .object({
    gte: z.date().optional(),
    lte: z.date().optional(),
  })
  .optional();

const numberFilter = z
  .object({ gte: z.number().optional(), lte: z.number().optional() })
  .optional();

const journalFilter = z.object({
  //Core Data
  id: idFilter,
  date: dateFilter,
  amount: numberFilter,
  description: stringFilter,

  //Status
  dataChecked: booleanFilter,
  complete: booleanFilter,
  reconciled: booleanFilter,
  linked: booleanFilter,

  //Linked Items
  billId: idFilter,
  budgetId: idFilter,
  categoryId: idFilter,
  tagId: idFilter,
  accountId: idFilter,
  accountGroupingId: idFilter,
  primaryJournalId: idFilter,

  //Dates
  updatedAt: dateFilter,
  createdAt: dateFilter,
});

export type JournalFilterValidationInputType = z.input<typeof journalFilter>;
export type JournalFilterValidation = z.infer<typeof journalFilter>;

const sort = z
  .array(
    z.object({
      key: z.enum(["date", "description", "updatedAt", "createdAt", "amount"]),
      direction: z.enum(["asc", "desc"]),
    })
  )
  .optional();

export type JournalSortValidation = z.infer<typeof sort>;

export const getJournalValidation = z.object({
  pagination: z
    .object({
      pageNo: z.number(),
      pageSize: z.number(),
    })
    .optional()
    .default({ pageNo: 0, pageSize: 10 }),
  filters: z.array(journalFilter).optional(),
  sort,
});

export type GetJournalValidation = z.infer<typeof getJournalValidation>;
