import { z } from 'zod';

export const createAccountGroupingValidation = z.object({
	title: z.string()
});

export type createAccountGroupingValidationZodType = typeof createAccountGroupingValidation
export type createAccountGroupingValidationType = z.infer<typeof createAccountGroupingValidation>;
