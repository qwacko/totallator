import type {
	CreateJournalInput,
	CreateTransactionMutationVariables
} from '$lib/graphqlClient/generated';
import { z } from 'zod';

import { AccountCreateValidation } from '../Account/AccountCreateValidation';
import { BillCreateValidation } from '../Bill/BillCreateValidation';
import { BudgetCreateValidation } from '../Budget/BudgetCreateValidation';
import { CategoryCreateValidation } from '../Category/CategoryCreateValidation';
import { TagCreateValidation } from '../Tag/TagCreateValidation';

export const CreateTransactionValidation = z
	.object({
		accountGroupingId: z.string().uuid(),
		description: z.string({ required_error: 'Description Is Required' }).min(2),
		date: z.string().length(10),
		amount: z.number({ required_error: 'Amount Is Required' }),
		fromAccount: AccountCreateValidation.optional(),
		fromAccountId: z.string().uuid().optional(),
		toAccount: AccountCreateValidation.optional(),
		toAccountId: z.string().uuid().optional(),
		bill: BillCreateValidation.optional(),
		billId: z.string().uuid().optional(),
		budget: BudgetCreateValidation.optional(),
		budgetId: z.string().uuid().optional(),
		category: CategoryCreateValidation.optional(),
		categoryId: z.string().uuid().optional(),
		tag: TagCreateValidation.optional(),
		tagId: z.string().uuid().optional(),
		linked: z.boolean().optional().default(true),
		reconciled: z.boolean().optional(),
		dataChecked: z.boolean().optional(),
		complete: z.boolean().optional()
	})
	.refine((val) => val.toAccount || val.toAccountId, {
		message: 'Must Have Either toAccountId or toAccount'
	})
	.refine((val) => val.fromAccount || val.fromAccountId, {
		message: 'Must Have Either fromAccountId or fromAccount'
	});

export type CreateTransactionValidationType = z.infer<typeof CreateTransactionValidation>;

export const CreateSingleTransactionVariables = (input: CreateTransactionValidationType) => {
	const {
		fromAccount,
		fromAccountId,
		toAccount,
		toAccountId,
		bill,
		budget,
		tag,
		category,
		amount,
		...rest
	} = CreateTransactionValidation.parse(input);

	const QueryInput: CreateTransactionMutationVariables = {
		input: [
			{
				...rest,
				amount,
				account: fromAccount ? { connectOrCreate: fromAccount } : undefined,
				accountId: fromAccountId,
				bill: bill ? { connectOrCreate: bill } : undefined,
				budget: budget ? { connectOrCreate: budget } : undefined,
				category: category ? { connectOrCreate: category } : undefined,
				tag: tag ? { connectOrCreate: tag } : undefined
			},
			{
				...rest,
				amount: -1.0 * amount,
				account: toAccount ? { connectOrCreate: toAccount } : undefined,
				accountId: toAccountId,
				bill: bill ? { connectOrCreate: bill } : undefined,
				budget: budget ? { connectOrCreate: budget } : undefined,
				category: category ? { connectOrCreate: category } : undefined,
				tag: tag ? { connectOrCreate: tag } : undefined
			}
		]
	};

	return QueryInput;
};
