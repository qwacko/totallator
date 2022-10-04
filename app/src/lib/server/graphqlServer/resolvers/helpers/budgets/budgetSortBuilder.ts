import type { BudgetSort, InputMaybe } from '$lib/server/graphqlServer/types/generated-resolvers';
import type { Prisma as PrismaType } from '@prisma/client';

import { accountGroupingSortBuilderSingle } from '../accountGrouping/accountGroupingSortBuilder';

export const budgetSortBuilder = (
	input: InputMaybe<BudgetSort[]> | undefined
): PrismaType.BudgetOrderByWithRelationAndSearchRelevanceInput[] => {
	if (!input) {
		return [{ title: 'asc' }, { createdAt: 'desc' }];
	}

	return input.map((item) => budgetSortBuilderSingle(item));
};

export const budgetSortBuilderSingle = (
	item: BudgetSort
): PrismaType.BudgetOrderByWithRelationAndSearchRelevanceInput => ({
	title: item.title ? item.title : undefined,
	status: item.status || undefined,
	deleted: item.deleted || undefined,
	active: item.active || undefined,
	disabled: item.disabled || undefined,
	allowUpdate: item.allowUpdate || undefined,
	accountGrouping: item.accountGrouping
		? accountGroupingSortBuilderSingle(item.accountGrouping)
		: undefined
});
