import { z } from 'zod';

import { PrismaStatusEnumValidation } from '../PrismaStatusEnumValidation';

export const importTagSingleValidation = z.object({
	id: z.string().optional(),
	group: z.string(),
	single: z.string(),
	status: PrismaStatusEnumValidation,
	createdAt: z.date().optional(),
	updatedAt: z.date().optional()
});
