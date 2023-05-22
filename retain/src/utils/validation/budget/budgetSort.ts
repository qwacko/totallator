import { z } from 'zod';

export const budgetSort = z
	.array(
		z.object({
			key: z.enum([
				'id',
				'title',
				'updatedAt',
				'createdAt',
				'status',
				'deleted',
				'allowUpdate',
				'active',
				'disabled'
			]),
			direction: z.enum(['asc', 'desc'])
		})
	)
	.optional();

export type BudgetSortValidation = z.infer<typeof budgetSort>;
