import { z } from 'zod';

export const numberFilter = z
	.object({ gte: z.number().optional(), lte: z.number().optional() })
	.optional();
