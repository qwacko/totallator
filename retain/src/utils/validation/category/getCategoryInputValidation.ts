import { z } from 'zod';

import { paginationValidation } from '../journalEntries/paginationValidation';
import { categoryFilter } from './categoryFilter';
import { categorySort } from './categorySort';

export const getCategoryInputValidation = z.object({
	pagination: paginationValidation.optional().default({ pageNo: 0, pageSize: 10 }),
	filters: z.array(categoryFilter).optional(),
	sort: categorySort
});
