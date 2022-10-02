import type {
	InputMaybe,
	JournalEntrySort
} from '$lib/server/graphqlServer/types/generated-resolvers';
import type { Prisma as PrismaType } from '@prisma/client';
import { isEmpty } from 'lodash-es';

import { accountGroupingSortBuilderSingle } from '../accountGrouping/accountGroupingSortBuilder';
import { accountSortBuilderSingle } from '../accounts/accountSortBuilder';
import { billSortBuilderSingle } from '../bills/billSortBuilder';
import { budgetSortBuilderSingle } from '../budgets/budgetSortBuilder';
import { categorySortBuilderSingle } from '../categories/categorySortBuilder';
import { tagSortBuilderSingle } from '../tags/tagSortBuilder';

export const journalEntrySortBuilder = (
	input: InputMaybe<JournalEntrySort[]> | undefined
): PrismaType.JournalEntryOrderByWithRelationAndSearchRelevanceInput[] => {
	const filteredInput = input?.filter((item) => !isEmpty(item));
	if (!input || !filteredInput || filteredInput.length === 0) {
		return [{ date: 'desc' }, { amount: 'desc' }, { createdAt: 'desc' }];
	}
	return input.map((item) => journalEntrySortBuilderSingle(item));
};

export const journalEntrySortBuilderSingle = (
	item: JournalEntrySort
): PrismaType.JournalEntryOrderByWithRelationAndSearchRelevanceInput => ({
	date: item.date || undefined,
	description: item.description || undefined,
	linked: item.linked || undefined,
	reconciled: item.reconciled || undefined,
	dataChecked: item.dataChecked || undefined,
	complete: item.complete || undefined,
	amount: item.amount || undefined,
	createdAt: item.createdAt || undefined,
	updatedAt: item.updatedAt || undefined,
	account: item.account ? accountSortBuilderSingle(item.account) : undefined,
	accountGrouping: item.accountGrouping
		? accountGroupingSortBuilderSingle(item.accountGrouping)
		: undefined,
	budget: item.budget ? budgetSortBuilderSingle(item.budget) : undefined,
	bill: item.bill ? billSortBuilderSingle(item.bill) : undefined,
	category: item.category ? categorySortBuilderSingle(item.category) : undefined,
	tag: item.tag ? tagSortBuilderSingle(item.tag) : undefined
});
