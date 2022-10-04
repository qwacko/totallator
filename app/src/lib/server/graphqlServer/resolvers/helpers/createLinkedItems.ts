import type { MutationSetUserToAgAdminArgs } from '$lib/graphqlClient/generated';
import type { Prisma, PrismaClient } from '@prisma/client';

import type { CreateAccountValidatedData } from './accounts/AccountCreateUpdateValidation';
import { ConnectOrCreateAccount } from './accounts/ConnectOrCreateAccount';
import type { CreateBillValidatedData } from './bills/BillCreateUpdateValidation';
import { ConnectOrCreateBill } from './bills/ConnectOrCreateBill';
import type { CreateBudgetValidatedData } from './budgets/BudgetCreateUpdateValidation';
import { ConnectOrCreateBudget } from './budgets/ConnectOrCreateBudget';
import type { CreateCategoryValidatedData } from './categories/CategoryCreateUpdateValidation';
import { ConnectOrCreateCategory } from './categories/ConnectOrCreateCategory';
import { ConnectOrCreateTag } from './tags/ConnectOrCreateCategory';
import type { CreateTagValidatedData } from './tags/TagCreateUpdateValidation';

type createLinkedItemsReturn = {
	accountId?: string;
	billId?: string;
	budgetId?: string;
	categoryId?: string;
	tagId?: string;
};

export const createLinkedItems = async ({
	account,
	category,
	tag,
	bill,
	budget,
	client,
	userId,
	admin
}: {
	userId: string;
	admin: boolean;
	account?: CreateAccountValidatedData;
	tag?: CreateTagValidatedData;
	bill?: CreateBillValidatedData;
	budget?: CreateBudgetValidatedData;
	category?: CreateCategoryValidatedData;
	client: PrismaClient | Prisma.TransactionClient;
}) => {
	const targetAccount = await ConnectOrCreateAccount({ client, data: account, userId, admin });
	const targetBill = await ConnectOrCreateBill({ client, data: bill, userId, admin });
	const targetBudget = await ConnectOrCreateBudget({ client, data: budget, userId, admin });
	const targetCategory = await ConnectOrCreateCategory({ client, data: category, userId, admin });
	const targetTag = await ConnectOrCreateTag({ client, data: tag, userId, admin });

	const result: createLinkedItemsReturn = {};

	if (targetAccount) result['accountId'] = targetAccount.id;
	if (targetBill) result['billId'] = targetBill.id;
	if (targetBudget) result['budgetId'] = targetBudget.id;
	if (targetCategory) result['categoryId'] = targetCategory.id;
	if (targetTag) result['tagId'] = targetTag.id;

	return result;
};
