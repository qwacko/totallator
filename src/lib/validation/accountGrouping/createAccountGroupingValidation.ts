import { z } from 'zod';

export const createAccountGroupingValidation = z.object({
	title: z.string()
});

export type createAccountGroupingValidationType = z.infer<typeof createAccountGroupingValidation>;
