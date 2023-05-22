import { z } from 'zod';

import { paginationValidation } from '../journalEntries/paginationValidation';
import { budgetFilter } from './budgetFilter';
import { budgetSort } from './budgetSort';

export const getBudgetInputValidation = z.object({
	pagination: paginationValidation.optional().default({ pageNo: 0, pageSize: 10 }),
	filters: z.array(budgetFilter).optional(),
	sort: budgetSort
});
