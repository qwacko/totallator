import type { BillSort, InputMaybe } from '$lib/server/graphqlServer/types/generated-resolvers';
import type { Prisma as PrismaType } from '@prisma/client';

import { accountGroupingSortBuilderSingle } from '../accountGrouping/accountGroupingSortBuilder';

export const billSortBuilder = (
	input: InputMaybe<BillSort[]> | undefined
): PrismaType.BillOrderByWithRelationAndSearchRelevanceInput[] => {
	if (!input) {
		return [{ title: 'asc' }, { createdAt: 'desc' }];
	}

	return input.map((item) => billSortBuilderSingle(item));
};

export const billSortBuilderSingle = (
	item: BillSort
): PrismaType.BillOrderByWithRelationAndSearchRelevanceInput => ({
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
