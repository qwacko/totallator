import { z } from 'zod';

export const EditJournalsInputValidation = z.object({
	description: z.string().min(2).optional(),
	date: z.string().length(10).optional(),
	amount: z.number().optional(),
	accountId: z.string().uuid().optional(),
	otherAccountId: z.string().uuid().optional(),
	billId: z.string().uuid().optional(),
	budgetId: z.string().uuid().optional(),
	categoryId: z.string().uuid().optional(),
	tagId: z.string().uuid().optional(),
	linked: z.boolean().optional(),
	reconciled: z.boolean().optional(),
	dataChecked: z.boolean().optional(),
	complete: z.boolean().optional()
});

export type EditJournalsInputValidationType = z.infer<typeof EditJournalsInputValidation>;
