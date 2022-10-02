import { z } from 'zod';

export const StringFilterValidation = z.object({
	contains: z.string().optional(),
	endsWith: z.string().optional(),
	in: z.array(z.string()).optional(),
	not: z.string().optional(),
	notIn: z.array(z.string()).optional(),
	startsWith: z.string().optional(),
	equals: z.string().optional(),
	mode: z.enum(['insensitive']).default('insensitive')
});
