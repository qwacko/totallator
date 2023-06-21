import { z } from 'zod';

import { PrismaStatusEnumValidation } from '$lib/validation/PrismaStatusEnumValidation';

export const updateAccountGroupingDataValidation = z.object({
	title: z.string().optional(),
	status: PrismaStatusEnumValidation.optional()
});

export type updateAccountGroupingDataValidationType = z.infer<
	typeof updateAccountGroupingDataValidation
>;

export const updateAccountGroupingValidation = z.object({
	id: z.string().cuid(),
}).merge(updateAccountGroupingDataValidation);

export type updateAccountGroupingValidationZodType = typeof updateAccountGroupingValidation;
export type updateAccountGroupingValidationType = z.infer<updateAccountGroupingValidationZodType>
