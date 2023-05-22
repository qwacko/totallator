import type { PrismaStatusEnum } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import type { createAccountValidationType } from 'src/utils/validation/account/createAccountValidation';
import { basicStatusToDBRequired } from 'src/utils/validation/basicStatusToDB';

import { createAccountGroupTitle } from './accountTitleGroupHandling';
import { defaultIncExp } from './defaultIncExp';

export const createAccountLinkedItems = ({
	createAssetAccounts,
	createLiabilityAccounts,
	createIncomeAccounts,
	createExpenseAccounts,
	accountGroupingId
}: {
	createAssetAccounts: string[] | undefined;
	createLiabilityAccounts: string[] | undefined;
	createIncomeAccounts: string[] | undefined;
	createExpenseAccounts: string[] | undefined;
	accountGroupingId: string;
}) => {
	const accountCreationAll = [
		...(createAssetAccounts
			? createAssetAccounts.map((item) => assAct({ title: item, accountGroupingId }))
			: []),
		...(createLiabilityAccounts
			? createLiabilityAccounts.map((item) =>
					assAct({ title: item, liab: true, accountGroupingId })
			  )
			: []),
		...(createIncomeAccounts
			? createIncomeAccounts.map((item) => incAct({ title: item, accountGroupingId }))
			: []),
		...(createExpenseAccounts
			? createExpenseAccounts.map((item) => expAct({ title: item, accountGroupingId }))
			: [])
	];

	return {
		accountCreationAll,
		assetAccounts: createAssetAccounts,
		liabilityAccounts: createLiabilityAccounts,
		incomeAccounts: createIncomeAccounts,
		expenseAccounts: createExpenseAccounts
	};
};

const incAct = ({
	title,
	accountGroupingId
}: {
	title: string;
	accountGroupingId: string;
}): createAccountValidationType => {
	return {
		...basicStatusToDBRequired('Active'),
		...defaultIncExp(title),
		type: 'Income',
		accountGroupingId
	};
};
const expAct = ({
	title,
	accountGroupingId
}: {
	title: string;
	accountGroupingId: string;
}): createAccountValidationType => {
	return {
		...basicStatusToDBRequired('Active'),
		...defaultIncExp(title),
		type: 'Expense',
		accountGroupingId
	};
};
const assAct = ({
	title: combinedTitle,
	liab: isLiability = false,
	accountGroupingId
}: {
	title: string;
	liab?: boolean;
	accountGroupingId: string;
}): createAccountValidationType => {
	const [title, ...accountGroups] = combinedTitle.split('/').reverse();
	const status: PrismaStatusEnum = 'Active';

	const [accountGroup, accountGroup2, accountGroup3] = accountGroups.reverse();

	if (!title) {
		throw new TRPCError({
			message: 'Account Title Is Blank',
			code: 'BAD_REQUEST'
		});
	}

	return {
		isCash: true,
		isNetWorth: true,
		...basicStatusToDBRequired(status),
		...createAccountGroupTitle({
			title,
			accountGroup,
			accountGroup2,
			accountGroup3
		}),
		type: isLiability ? 'Liability' : 'Asset',
		accountGroupingId
	};
};
