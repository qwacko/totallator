import { z } from 'zod';

export const CategoryCreateValidation = z
	.object({
		group: z.string(),
		single: z.string(),
		accountGroupingId: z.string().uuid(),
		status: z.enum(['Active', 'Disabled', 'Deleted']).default('Active')
	})
	.strict();

export type CreateCategoryValidatedData = z.infer<typeof CategoryCreateValidation>;

export const CategoryUpdateValidation = z
	.object({
		group: z.string().optional(),
		single: z.string().optional(),
		status: z.enum(['Active', 'Disabled', 'Deleted']).optional()
	})
	.strict();

export type UpdateCategoryValidatedData = z.infer<typeof CategoryUpdateValidation>;
