import { z } from 'zod';

import { PrismaStatusEnumValidation } from '$lib/validation/PrismaStatusEnumValidation';

const updateBudgetDataValidation = z.object({
	title: z.string().min(2).optional(),
	status: PrismaStatusEnumValidation.optional()
});

export type updateBudgetDataValidationType = z.infer<typeof updateBudgetDataValidation>;

export const updateBudgetValidation = z.object({
	id: z.string().cuid(),
	data: updateBudgetDataValidation
});
