import { z } from 'zod';

export const paginationValidation = z.object({
	pageNo: z.number(),
	pageSize: z.number()
});
