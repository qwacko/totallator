import { z } from 'zod';

export const billSort = z
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

export type BillSortValidation = z.infer<typeof billSort>;
