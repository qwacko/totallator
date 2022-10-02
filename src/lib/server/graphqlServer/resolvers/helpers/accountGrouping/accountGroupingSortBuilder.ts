import type { AccountGroupingSort } from '$lib/server/graphqlServer/types/generated-resolvers';
import type { Prisma as PrismaType } from '@prisma/client';

export const accountGroupingSortBuilderSingle = (
	item: AccountGroupingSort
): PrismaType.AccountGroupingOrderByWithRelationAndSearchRelevanceInput => ({
	title: item.title || undefined,
	status: item.status || undefined,
	deleted: item.deleted || undefined,
	disabled: item.disabled || undefined,
	active: item.active || undefined
});
