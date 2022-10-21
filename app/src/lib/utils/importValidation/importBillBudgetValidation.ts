import { z } from 'zod';
import { statusEnumValidation } from './statusEnumValidation';
import { validateISOTime } from './validateISOTime';

export const importBillBudgetValidation = z.object({
	id: z.string(),
	title: z.string().optional(),
	status: statusEnumValidation.optional(),
	createdAt: validateISOTime.optional(),
	updatedAt: validateISOTime.optional()
});

export const importBillValidation = importBillBudgetValidation;
export const importBudgetValidation = importBillBudgetValidation;
