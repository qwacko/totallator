import type { CategorySort, InputMaybe } from '$lib/server/graphqlServer/types/generated-resolvers';
import type { Prisma as PrismaType } from '@prisma/client';

import { accountGroupingSortBuilderSingle } from '../accountGrouping/accountGroupingSortBuilder';

export const categorySortBuilder = (
	input: InputMaybe<CategorySort[]> | undefined
): PrismaType.CategoryOrderByWithRelationAndSearchRelevanceInput[] => {
	if (!input) {
		return [{ title: 'asc' }, { createdAt: 'desc' }];
	}

	return input.map((item) => categorySortBuilderSingle(item));
};

export const categorySortBuilderSingle = (
	item: CategorySort
): PrismaType.CategoryOrderByWithRelationAndSearchRelevanceInput => ({
	title: item.title ? item.title : undefined,
	group: item.group || undefined,
	single: item.single || undefined,
	status: item.status || undefined,
	deleted: item.deleted || undefined,
	active: item.active || undefined,
	disabled: item.disabled || undefined,
	allowUpdate: item.allowUpdate || undefined,
	accountGrouping: item.accountGrouping
		? accountGroupingSortBuilderSingle(item.accountGrouping)
		: undefined
});
