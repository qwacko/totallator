import { z } from 'zod';

export const BudgetCreateValidation = z
	.object({
		title: z.string(),
		accountGroupingId: z.string().uuid(),
		status: z.enum(['Active', 'Disabled', 'Deleted']).default('Active')
	})
	.strict();

export type CreateBudgetValidatedData = z.infer<typeof BudgetCreateValidation>;

export const BudgetUpdateValidation = z
	.object({
		title: z.string().optional(),
		status: z.enum(['Active', 'Disabled', 'Deleted']).optional()
	})
	.strict();

export type UpdateBudgetValidatedData = z.infer<typeof BudgetUpdateValidation>;
