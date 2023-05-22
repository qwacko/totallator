import { z } from 'zod';

import { PrismaStatusEnumValidation } from 'src/utils/validation/PrismaStatusEnumValidation';

export const updateAccountGroupingDataValidation = z.object({
	title: z.string().optional(),
	status: PrismaStatusEnumValidation.optional()
});

export type updateAccountGroupingDataValidationType = z.infer<
	typeof updateAccountGroupingDataValidation
>;

export const updateAccountGroupingValidation = z.object({
	id: z.string().cuid(),
	data: updateAccountGroupingDataValidation
});
