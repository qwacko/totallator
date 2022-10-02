import { z } from 'zod';

export const StatusFilterValidation = z.object({
	in: z.array(z.enum(['Active', 'Disabled', 'Deleted'])).optional(),
	notIn: z.array(z.enum(['Active', 'Disabled', 'Deleted'])).optional(),
	equals: z.enum(['Active', 'Disabled', 'Deleted']).optional(),
	not: z.enum(['Active', 'Disabled', 'Deleted']).optional()
});
