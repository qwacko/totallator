import { z } from "zod";

export const summaryReturnCoreValidation = z.object({
  _sum: z.object({
    amount: z.number().nullable()
  }),
  _min: z.object({
    date: z.date().nullable(),
    amount: z.number().nullable()
  }),
  _max: z.object({
    date: z.date().nullable(),
    amount: z.number().nullable()
  }),
  _count: z.object({ _all: z.number().nullable() })
});

export type SummaryReturnCoreValidation = z.infer<
  typeof summaryReturnCoreValidation
>;

export const summaryReturnGroupingValidation = z.object({
  accountId: z.string().nullable(),
  billId: z.string().nullable(),
  budgetId: z.string().nullable(),
  categoryId: z.string().nullable(),
  tagId: z.string().nullable(),
  accountGroupingId: z.string().nullable()
});

export type SummaryReturnGroupingValidation = z.infer<
  typeof summaryReturnGroupingValidation
>;

export const summaryReturnSingleValidation = summaryReturnCoreValidation.merge(
  summaryReturnGroupingValidation.partial()
);

export type SummaryReturnSingleValidationType = z.infer<
  typeof summaryReturnSingleValidation
>;

export const summaryReturnValidation = z.array(summaryReturnSingleValidation);

export type SummaryReturnValidationType = z.infer<
  typeof summaryReturnValidation
>;
