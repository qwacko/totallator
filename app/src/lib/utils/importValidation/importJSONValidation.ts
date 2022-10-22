import { z } from 'zod';
import { importJournalsValidation } from '../importJournalsValidation';
import { importAccountValidation } from './importAccountValidation';
import { importBillValidation, importBudgetValidation } from './importBillBudgetValidation';
import { importCategoryValidation, importTagValidation } from './importTagCategoryValidation';

export const importJSONValidation = z.object({
	journals: importJournalsValidation.default([]),
	bills: z.array(importBillValidation).default([]),
	budgets: z.array(importBudgetValidation).default([]),
	tags: z.array(importTagValidation).default([]),
	categories: z.array(importCategoryValidation).default([]),
	accounts: z.array(importAccountValidation).default([])
});
