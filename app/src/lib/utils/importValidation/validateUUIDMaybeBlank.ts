import { z } from 'zod';

const booleanOptions = ['TRUE', 'True', 'true', '1', 'FALSE', 'False', 'false', '0'] as const;
export const booleanImportValidation = z
	.string()
	.max(0, { message: `String must be empty or one of ${booleanOptions.join(', ')}` })
	.or(z.enum(booleanOptions))
	.or(z.boolean().transform((arg) => (arg ? 'True' : 'False')))
	.transform((arg) => {
		if (['TRUE', 'True', 'true', '1'].includes(arg)) {
			return true;
		} else return false;
	});
export const validateUUIDMaybeBlank = z.string().trim().uuid().or(z.string().max(0));
