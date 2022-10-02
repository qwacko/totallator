import { z } from 'zod';

export const AccountCreateValidation = z
	.object({
		title: z.string(),
		isCash: z.boolean().optional(),
		isNetWorth: z.boolean().optional(),
		accountGroup: z.string().optional(),
		accountGroup2: z.string().optional(),
		accountGroup3: z.string().optional(),
		accountGroupingId: z.string().uuid(),
		type: z.enum(['Asset', 'Liability', 'Income', 'Expense']).default('Expense'),
		startDate: z.date().optional(),
		endDate: z.date().optional(),
		status: z.enum(['Active', 'Disabled', 'Deleted']).default('Active')
	})
	.strict();

export type CreateAccountValidatedData = z.infer<typeof AccountCreateValidation>;

export const AccountUpdateValidation = z
	.object({
		title: z.string().optional(),
		isCash: z.boolean().optional(),
		isNetWorth: z.boolean().optional(),
		accountGroup: z.string().optional().nullable(),
		accountGroup2: z.string().optional().nullable(),
		accountGroup3: z.string().optional().nullable(),
		type: z.enum(['Asset', 'Liability', 'Income', 'Expense']).optional(),
		startDate: z.date().optional().nullable(),
		endDate: z.date().optional().nullable(),
		status: z.enum(['Active', 'Disabled', 'Deleted']).optional()
	})
	.strict();

export type UpdateAccountValidatedData = z.infer<typeof AccountUpdateValidation>;
