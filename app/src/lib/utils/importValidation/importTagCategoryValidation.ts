import { z } from 'zod';
import { statusEnumValidation } from './statusEnumValidation';
import { validateISOTime } from './validateISOTime';

export const importTagCategoryValidation = z.object({
	id: z.string(),
	title: z
		.string()
		.regex(/.*\/.*/, { message: 'Must Have a /' })
		.optional(),
	group: z.string().optional(),
	single: z.string().optional(),
	status: statusEnumValidation.optional(),
	createdAt: validateISOTime.optional(),
	updatedAt: validateISOTime.optional()
});

export const importTagValidation = importTagCategoryValidation;
export const importCategoryValidation = importTagCategoryValidation;
