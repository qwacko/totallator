import { z } from 'zod';

export const DateFilterValidation = z.object({
	equals: z.date().optional(),
	not: z.date().optional(),
	gt: z.date().optional(),
	gte: z.date().optional(),
	lt: z.date().optional(),
	lte: z.date().optional(),
	in: z.array(z.date()).optional(),
	notIn: z.array(z.date()).optional()
});
