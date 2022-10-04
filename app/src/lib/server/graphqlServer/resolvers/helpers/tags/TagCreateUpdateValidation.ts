import { z } from 'zod';

export const TagCreateValidation = z
	.object({
		group: z.string(),
		single: z.string(),
		accountGroupingId: z.string().uuid(),
		status: z.enum(['Active', 'Disabled', 'Deleted']).default('Active')
	})
	.strict();

export type CreateTagValidatedData = z.infer<typeof TagCreateValidation>;

export const TagUpdateValidation = z
	.object({
		group: z.string().optional(),
		single: z.string().optional(),
		status: z.enum(['Active', 'Disabled', 'Deleted']).optional()
	})
	.strict();

export type UpdateTagValidatedData = z.infer<typeof TagUpdateValidation>;
