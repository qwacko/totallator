import { GraphQLYogaError } from '@graphql-yoga/common';
import type { Prisma, PrismaClient } from '@prisma/client';

const checkItem = ({
	accountGroupingIds,
	targetIds,
	targetAG,
	errorTitle
}: {
	accountGroupingIds: string[];
	targetIds: string[];
	targetAG: string;
	errorTitle: string;
}) => {
	const accountAGs = [...new Set(accountGroupingIds)];
	if (accountGroupingIds.length !== targetIds.length) {
		throw new GraphQLYogaError(`Not All ${errorTitle}  Found`);
	}
	if (accountAGs.length > 1) {
		throw new GraphQLYogaError(`All Targetted ${errorTitle} Must Have the same account grouping`);
	}
	if (accountAGs[0] !== targetAG) {
		throw new GraphQLYogaError(`Account Grouping of ${errorTitle} doesn't match Transaction`);
	}
};

export const checkLinkedItems = async ({
	accountGroupingId,
	accountIds,
	tagIds,
	billIds,
	budgetIds,
	categoryIds,
	client
}: {
	accountGroupingId: string;
	accountIds?: string[];
	tagIds?: string[];
	billIds?: string[];
	budgetIds?: string[];
	categoryIds?: string[];
	client: PrismaClient | Prisma.TransactionClient;
}) => {
	if (accountIds) {
		const accounts = await client.account.findMany({
			where: { id: { in: accountIds } },
			select: { id: true, accountGroupingId: true }
		});
		checkItem({
			accountGroupingIds: accounts.map((item) => item.accountGroupingId),
			targetIds: accountIds,
			targetAG: accountGroupingId,
			errorTitle: 'Account'
		});
	}
	if (tagIds) {
		const tags = await client.tag.findMany({
			where: { id: { in: tagIds } },
			select: { id: true, accountGroupingId: true }
		});
		checkItem({
			accountGroupingIds: tags.map((item) => item.accountGroupingId),
			targetIds: tagIds,
			targetAG: accountGroupingId,
			errorTitle: 'Account'
		});
	}
	if (billIds) {
		const bills = await client.bill.findMany({
			where: { id: { in: billIds } },
			select: { id: true, accountGroupingId: true }
		});
		checkItem({
			accountGroupingIds: bills.map((item) => item.accountGroupingId),
			targetIds: billIds,
			targetAG: accountGroupingId,
			errorTitle: 'Account'
		});
	}
	if (budgetIds) {
		const budgets = await client.budget.findMany({
			where: { id: { in: budgetIds } },
			select: { id: true, accountGroupingId: true }
		});
		checkItem({
			accountGroupingIds: budgets.map((item) => item.accountGroupingId),
			targetIds: budgetIds,
			targetAG: accountGroupingId,
			errorTitle: 'Account'
		});
	}
	if (categoryIds) {
		const categories = await client.category.findMany({
			where: { id: { in: budgetIds } },
			select: { id: true, accountGroupingId: true }
		});
		checkItem({
			accountGroupingIds: categories.map((item) => item.accountGroupingId),
			targetIds: categoryIds,
			targetAG: accountGroupingId,
			errorTitle: 'Account'
		});
	}
};
