import { z } from 'zod';

import { PrismaStatusEnumValidation } from '../PrismaStatusEnumValidation';

export const createTagValidation = z.object({
	group: z.string().min(2),
	single: z.string().min(2),
	accountGroupingId: z.string().cuid(),
	status: PrismaStatusEnumValidation.optional()
});

export type createTagValidationType = z.infer<typeof createTagValidation>;
