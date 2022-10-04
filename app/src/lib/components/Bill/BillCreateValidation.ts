import { StatusEnum } from '$lib/graphqlClient/generated';
import { z } from 'zod';

export const BillCreateValidation = z.object({
	title: z.string({ required_error: 'Title Is Required' }),
	accountGroupingId: z.string({ required_error: 'Account Grouping Must Be Selected' }).uuid(),
	status: z.enum([StatusEnum.Active, StatusEnum.Deleted, StatusEnum.Disabled]).optional()
});
