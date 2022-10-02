import { z } from 'zod';

export const BooleanFilterValidation = z.object({
	equals: z.boolean().optional(),
	not: z.boolean().optional()
});
