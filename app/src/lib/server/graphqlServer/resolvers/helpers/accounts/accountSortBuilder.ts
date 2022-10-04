import type { AccountSort, InputMaybe } from '$lib/server/graphqlServer/types/generated-resolvers';
import type { Prisma as PrismaType } from '@prisma/client';

export const accountSortBuilder = (
	input: InputMaybe<AccountSort[]> | undefined
): PrismaType.AccountOrderByWithRelationAndSearchRelevanceInput[] => {
	if (!input) {
		return [{ title: 'asc' }, { createdAt: 'desc' }];
	}

	return input.map((item) => accountSortBuilderSingle(item));
};

export const accountSortBuilderSingle = (
	item: AccountSort
): PrismaType.AccountOrderByWithRelationAndSearchRelevanceInput => ({
	title: item.title ? item.title : undefined,
	accountGroup: item.accountGroup || undefined,
	accountGroup2: item.accountGroup2 || undefined,
	accountGroup3: item.accountGroup3 || undefined,
	isCash: item.isCash || undefined,
	isNetWorth: item.isNetWorth || undefined,
	status: item.status || undefined,
	deleted: item.deleted || undefined,
	active: item.active || undefined,
	disabled: item.disabled || undefined,
	allowUpdate: item.allowUpdate || undefined,
	accountTitleCombined: item.accountTitleCombined || undefined,
	accountGroupCombined: item.accountGroupCombined || undefined,
	startDate: item.startDate || undefined,
	endDate: item.endDate || undefined
});
