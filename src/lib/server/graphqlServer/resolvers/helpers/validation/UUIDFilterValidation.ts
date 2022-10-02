import { z } from 'zod';

export const UUIDFilterValidation = z.object({
	equals: z.string().uuid().optional(),
	not: z.string().uuid().optional(),
	in: z.array(z.string().uuid()).optional(),
	notIn: z.array(z.string().uuid()).optional()
});
