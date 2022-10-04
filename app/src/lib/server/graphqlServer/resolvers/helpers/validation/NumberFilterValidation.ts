import { z } from 'zod';

export const NumberFilterValidation = z.object({
	equals: z.number().optional(),
	gt: z.number().optional(),
	gte: z.number().optional(),
	lt: z.number().optional(),
	lte: z.number().optional(),
	in: z.array(z.number()).optional(),
	notIn: z.array(z.number()).optional(),
	not: z.number().optional()
});
