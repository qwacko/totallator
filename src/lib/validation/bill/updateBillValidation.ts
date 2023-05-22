import { z } from 'zod';

import { PrismaStatusEnumValidation } from '$lib/validation/PrismaStatusEnumValidation';

const updateBillDataValidation = z.object({
	title: z.string().min(2).optional(),
	status: PrismaStatusEnumValidation.optional()
});

export type updateBillDataValidationType = z.infer<typeof updateBillDataValidation>;

export const updateBillValidation = z.object({
	id: z.string().cuid(),
	data: updateBillDataValidation
});
