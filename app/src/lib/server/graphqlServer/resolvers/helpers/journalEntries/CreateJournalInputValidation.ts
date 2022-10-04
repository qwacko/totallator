import { z } from 'zod';

import { AccountCreateValidation } from '../accounts/AccountCreateUpdateValidation';
import { BillCreateValidation } from '../bills/BillCreateUpdateValidation';
import { BudgetCreateValidation } from '../budgets/BudgetCreateUpdateValidation';
import { CategoryCreateValidation } from '../categories/CategoryCreateUpdateValidation';
import { checkAGAccessBool } from '../general/checkAGAccess';
import { TagCreateValidation } from '../tags/TagCreateUpdateValidation';

export const CreateJournalInputValidation = z
	.object({
		date: z.date(),
		description: z.string(),
		amount: z.number(),
		linked: z.boolean().optional().default(true),
		reconciled: z.boolean().optional().default(false),
		dataChecked: z.boolean().optional().default(false),
		complete: z.boolean().optional().default(false),
		accountGroupingId: z.string().uuid(),
		accountId: z.string().uuid().optional(),
		billId: z.string().uuid().optional(),
		budgetId: z.string().uuid().optional(),
		categoryId: z.string().uuid().optional(),
		tagId: z.string().uuid().optional(),
		account: z.object({ connectOrCreate: AccountCreateValidation.optional() }).optional(),
		bill: z.object({ connectOrCreate: BillCreateValidation.optional() }).optional(),
		budget: z.object({ connectOrCreate: BudgetCreateValidation.optional() }).optional(),
		category: z.object({ connectOrCreate: CategoryCreateValidation.optional() }).optional(),
		tag: z.object({ connectOrCreate: TagCreateValidation.optional() }).optional()
	})
	.strict()
	.refine((val) => val.account?.connectOrCreate || val.accountId, {
		message: 'Must Have Either An AccountId or Create an Account'
	})
	.refine((val) => !(Boolean(val.accountId) && Boolean(val.account?.connectOrCreate)), {
		message: 'Can Only Have one of accountId or account.connectOrCreate'
	})
	.refine((val) => !(Boolean(val.billId) && Boolean(val.bill?.connectOrCreate)), {
		message: 'Can only have one of billId and bill.connectOrCreate'
	})
	.refine((val) => !(Boolean(val.budgetId) && Boolean(val.budget?.connectOrCreate)), {
		message: 'Can only have one of budgetId and budget.connectOrCreate'
	})
	.refine((val) => !(Boolean(val.categoryId) && Boolean(val.category?.connectOrCreate)), {
		message: 'Can only have one of categoryId and category.connectOrCreate'
	})
	.refine((val) => !(Boolean(val.tagId) && Boolean(val.tag?.connectOrCreate)), {
		message: 'Can only have one of tagId and tag.connectOrCreate'
	})
	.refine(
		(val) =>
			val.account?.connectOrCreate
				? val.accountGroupingId === val.account.connectOrCreate.accountGroupingId
				: true,
		{ message: 'Journal Account Grouping Id and Accpunt Account Grouping Id must match' }
	)
	.refine(
		(val) =>
			val.bill?.connectOrCreate
				? val.accountGroupingId === val.bill.connectOrCreate.accountGroupingId
				: true,
		{ message: 'Journal Account Grouping Id and Bill Account Grouping Id must match' }
	)
	.refine(
		(val) =>
			val.budget?.connectOrCreate
				? val.accountGroupingId === val.budget.connectOrCreate.accountGroupingId
				: true,
		{ message: 'Journal Account Grouping Id and Budget Account Grouping Id must match' }
	)
	.refine(
		(val) =>
			val.category?.connectOrCreate
				? val.accountGroupingId === val.category.connectOrCreate.accountGroupingId
				: true,
		{ message: 'Journal Account Grouping Id and Category Account Groupng Id must match' }
	)
	.refine(
		(val) =>
			val.tag?.connectOrCreate
				? val.accountGroupingId === val.tag.connectOrCreate.accountGroupingId
				: true,
		{ message: 'Journal Account Grouping Id and Tag Account Grouping Id must match' }
	);

export type CreateJournalInputValidationType = z.infer<typeof CreateJournalInputValidation>;

export const CreateJournalInputArrayValidation = ({
	admin,
	userId
}: {
	admin: boolean;
	userId: string;
}) =>
	z
		.array(CreateJournalInputValidation)
		.min(2, { message: 'New transaction must have at least two journals' })
		.refine((val) => [...new Set(val.map((item) => item.accountGroupingId))].length === 1, {
			message: 'Account Groupings Must Be The Same Between Journal Entries'
		})
		.refine(
			async (val) => {
				const result = await checkAGAccessBool({
					accountGroupingId: val[0].accountGroupingId,
					admin,
					userId,
					needsAdminAccess: true
				});
				return result;
			},
			{ message: 'User Cannot Access Chosen Account Grouping' }
		)
		.refine((val) => [...new Set(val.map((item) => item.linked))].length === 1, {
			message: 'Linked Settings Must Match Between Journal Entries'
		})
		.refine((input) => input.map((item) => item.amount).reduce((a, b) => a + b, 0) === 0, {
			message: 'Sum of amounts must equal zero'
		})
		.transform((val) => {
			if (val[0].linked) {
				//Map all the linked properties through
				return val.map((item) => ({
					...item,
					date: val[0].date,
					linked: val[0].linked,
					accountGroupingId: val[0].accountGroupingId,
					billId: val[0].billId,
					budgetId: val[0].budgetId,
					categoryId: val[0].budgetId,
					tagId: val[0].tagId,
					reconciled: val[0].reconciled,
					complete: val[0].complete,
					dataChecked: val[0].dataChecked,
					description: val[0].description
				}));
			}
			return val;
		});
