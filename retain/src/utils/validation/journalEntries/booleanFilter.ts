import { z } from 'zod';

export const booleanFilter = z
	.object({ equals: z.boolean().optional(), not: z.boolean().optional() })
	.optional();
