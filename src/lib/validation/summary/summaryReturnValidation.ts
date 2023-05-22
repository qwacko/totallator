import { z } from 'zod';

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

export const summaryReturnGroupingValidation = z.object({
	accountId: z.string().nullable(),
	billId: z.string().nullable(),
	budgetId: z.string().nullable(),
	categoryId: z.string().nullable(),
	tagId: z.string().nullable(),
	accountGroupingId: z.string().nullable(),
	year: z.string().nullable(),
	yearMonth: z.string().nullable(),
	yearMonthDay: z.string().nullable(),
	yearQuarter: z.string().nullable(),
	yearWeek: z.string().nullable()
});

const summaryReturnSingleValidation = summaryReturnCoreValidation.merge(
	summaryReturnGroupingValidation.partial()
);

export const summaryReturnValidation = z.array(summaryReturnSingleValidation);

export type SummaryReturnValidationType = z.infer<typeof summaryReturnValidation>;
