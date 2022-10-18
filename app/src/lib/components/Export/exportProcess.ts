import type { GetExportDataQuery } from '$lib/graphqlClient/generated';
import type { OperationResult } from '@urql/svelte';
import { get, omit } from 'lodash-es';

export const exportProcess = (data: OperationResult<GetExportDataQuery>['data']) => {
	if (!data) {
		return undefined;
	}
	//Flatten details of Other Items
	const categories = data.categories.categories.map((item) => {
		return {
			...omit(item, ['__typename', 'accountGrouping']),
			accountGroupingId: get(item, 'accountGrouping.id', '') as string
		};
	});
	const bills = data.bills.bills.map((item) => {
		return {
			...omit(item, ['__typename', 'accountGrouping']),
			accountGroupingId: get(item, 'accountGrouping.id', '') as string
		};
	});
	const budgets = data.budgets.budgets.map((item) => {
		return {
			...omit(item, ['__typename', 'accountGrouping']),
			accountGroupingId: get(item, 'accountGrouping.id', '') as string
		};
	});
	const tags = data.tags.tags.map((item) => {
		return {
			...omit(item, ['__typename', 'accountGrouping']),
			accountGroupingId: get(item, 'accountGrouping.id', '') as string
		};
	});
	const accounts = data.accounts.accounts.map((item) => {
		return {
			...omit(item, ['__typename', 'accountGrouping']),
			accountGroupingId: get(item, 'accountGrouping.id', '') as string
		};
	});

	const journalEntries = data.journalEntries.journalEntries.map((journal) => {
		const targetCategory = journal.category;
		const category = targetCategory
			? categories.find((item) => item.id === targetCategory.id)
			: undefined;
		const targetBill = journal.bill;
		const bill = targetBill ? bills.find((item) => item.id === targetBill.id) : undefined;
		const targetBudget = journal.budget;
		const budget = targetBudget ? budgets.find((item) => item.id === targetBudget.id) : undefined;
		const targetTag = journal.tag;
		const tag = targetTag ? tags.find((item) => item.id === targetTag.id) : undefined;
		const account = accounts.find((item) => item.id === journal.account.id);

		return {
			...omit(journal, [
				'__typename',
				'category',
				'bill',
				'budget',
				'tag',
				'account',
				'accountGrouping'
			]),
			accountGroupingId: journal.accountGrouping.id as string,
			accountId: account?.id as string,
			accountTitle: account?.title,
			categoryId: category?.id as string | undefined,
			categoryTitle: category?.title,
			billId: bill?.id as string | undefined,
			billTitle: bill?.title,
			budgetId: budget?.id as string | undefined,
			budgetTitle: budget?.title,
			tagId: tag?.id as string | undefined,
			tagTitle: tag?.title
		};
	});

	return { journalEntries, accounts, categories, bills, budgets, tags };
};
