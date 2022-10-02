import type { InputMaybe, TagSort } from '$lib/server/graphqlServer/types/generated-resolvers';
import type { Prisma as PrismaType } from '@prisma/client';

import { accountGroupingSortBuilderSingle } from '../accountGrouping/accountGroupingSortBuilder';

export const tagSortBuilder = (
	input: InputMaybe<TagSort[]> | undefined
): PrismaType.TagOrderByWithRelationAndSearchRelevanceInput[] => {
	if (!input) {
		return [{ title: 'asc' }, { createdAt: 'desc' }];
	}

	return input.map((item) => tagSortBuilderSingle(item));
};

export const tagSortBuilderSingle = (
	item: TagSort
): PrismaType.TagOrderByWithRelationAndSearchRelevanceInput => ({
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
