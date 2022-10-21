import { z } from 'zod';
import { accountTypeEnumValidation } from './accountTypeEnumValidation';
import { statusEnumValidation } from './statusEnumValidation';
import { validateDate } from './validateDate';
import { validateISOTime } from './validateISOTime';
import { booleanImportValidation, validateUUIDMaybeBlank } from './validateUUIDMaybeBlank';

export const importAccountValidation = z.object({
	id: z.string(),
	title: z.string().optional(),
	type: accountTypeEnumValidation.optional(),
	isCash: booleanImportValidation.optional(),
	isNetWorth: booleanImportValidation.optional(),
	accountGroup: z.string().nullable().optional(),
	accountGroup2: z.string().nullable().optional(),
	accountGroup3: z.string().nullable().optional(),
	startDate: validateDate.nullable().optional(),
	endDate: validateDate.nullable().optional(),
	status: statusEnumValidation.optional(),
	createdAt: validateISOTime.optional(),
	updatedAt: validateISOTime.optional()
});
