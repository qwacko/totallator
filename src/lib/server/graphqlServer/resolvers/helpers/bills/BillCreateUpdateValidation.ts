import { z } from 'zod';

export const BillCreateValidation = z
	.object({
		title: z.string(),
		accountGroupingId: z.string().uuid(),
		status: z.enum(['Active', 'Disabled', 'Deleted']).default('Active')
	})
	.strict();

export type CreateBillValidatedData = z.infer<typeof BillCreateValidation>;

export const BillUpdateValidation = z
	.object({
		title: z.string().optional(),
		status: z.enum(['Active', 'Disabled', 'Deleted']).optional()
	})
	.strict();

export type UpdateBillValidatedData = z.infer<typeof BillUpdateValidation>;
