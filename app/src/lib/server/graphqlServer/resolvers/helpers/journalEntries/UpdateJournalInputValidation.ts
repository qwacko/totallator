import { z } from 'zod';

export const UpdateJournalInputValidation = z
	.object({
		date: z.date().optional(),
		description: z.string().optional(),
		amount: z.number().optional(),
		reconciled: z.boolean().optional(),
		dataChecked: z.boolean().optional(),
		accountId: z.string().uuid().optional(),
		otherAccountId: z.string().uuid().optional(),
		billId: z.string().uuid().optional().nullable(),
		budgetId: z.string().uuid().optional().nullable(),
		categoryId: z.string().uuid().optional().nullable(),
		tagId: z.string().uuid().optional().nullable()
	})
	.strict();

export type UpdateJournalValidatedType = z.infer<typeof UpdateJournalInputValidation>;
