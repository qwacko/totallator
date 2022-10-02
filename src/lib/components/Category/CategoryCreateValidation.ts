import { StatusEnum } from '$lib/graphqlClient/generated';
import { z } from 'zod';

export const CategoryCreateValidation = z.object({
	group: z.string({ required_error: 'Category Group Is Required' }),
	single: z.string({ required_error: 'Category Single Is Required' }),
	accountGroupingId: z.string({ required_error: 'Account Grouping Must Be Selected' }).uuid(),
	status: z.enum([StatusEnum.Active, StatusEnum.Deleted, StatusEnum.Disabled]).optional()
});
