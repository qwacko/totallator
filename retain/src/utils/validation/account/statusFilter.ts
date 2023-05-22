import { z } from 'zod';

import { PrismaStatusEnumValidation } from '../PrismaStatusEnumValidation';

export const statusFilter = z
	.object({
		in: z.array(PrismaStatusEnumValidation).optional(),
		notIn: z.array(PrismaStatusEnumValidation).optional(),
		equals: PrismaStatusEnumValidation.optional(),
		notEqual: PrismaStatusEnumValidation.optional()
	})
	.optional();
