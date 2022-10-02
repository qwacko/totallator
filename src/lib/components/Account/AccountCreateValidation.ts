import { AccountType, StatusEnum } from '$lib/graphqlClient/generated';
import { z } from 'zod';

export const AccountCreateValidation = z.object({
	title: z.string({ required_error: 'Title Is Required' }),
	isCash: z.boolean().optional(),
	isNetWorth: z.boolean().optional(),
	type: z
		.enum([AccountType.Income, AccountType.Expense, AccountType.Asset, AccountType.Liability])
		.optional(),
	accountGroup: z.string().optional(),
	accountGroup2: z.string().optional(),
	accountGroup3: z.string().optional(),
	startDate: z.string().length(10).optional(),
	endDate: z.string().length(10).optional(),
	accountGroupingId: z.string({ required_error: 'Account Grouping Must Be Selected' }).uuid(),
	status: z.enum([StatusEnum.Active, StatusEnum.Deleted, StatusEnum.Disabled]).optional()
});
