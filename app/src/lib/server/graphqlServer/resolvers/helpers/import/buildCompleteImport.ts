import type { ImportDataProcessed } from '$lib/server/graphqlServer/types/generated-resolvers';
import type { importJournalsValidationReturnType } from '$lib/utils/importJournalsValidation';
import type { checkImportInfoReturn } from './checkImportInfo';

const getId = (
	dataArray: { id: string; title: string; [key: string]: unknown }[] | undefined,
	id: string | undefined,
	title: string | undefined
) => {
	if (id) return id;
	if (!title || !dataArray) return undefined;
	const result = dataArray.find((item) => item.title === title);
	if (!result) return undefined;
	return result.id;
};

const getTitle = (
	dataArray: { id: string; title: string; [key: string]: unknown }[] | undefined,
	id: string | undefined,
	title: string | undefined
) => {
	if (title) return title;
	if (!id || !dataArray) return undefined;
	const result = dataArray.find((item) => item.id === id);
	if (!result) return undefined;
	return result.title;
};

export const buildCompleteImport = (
	data: importJournalsValidationReturnType,
	matches: checkImportInfoReturn['matches'],
	accountGroupingId: string
): ImportDataProcessed[] => {
	const mappedData = data.map((item) => ({
		primaryJournalId: item.primaryJournalId,
		accountGroupingId: accountGroupingId,
		amount: item.amount,
		linked: item.linked || false,
		dataChecked: item.dataChecked || false,
		reconciled: item.reconciled || false,
		complete: item.complete || false,
		date: item.date,
		description: item.description,
		status: [],
		accountId: getId(matches.accountTitleMatches, item.accountId, item.accountTitle) || '',
		accountTitle: getTitle(matches.accountIdMatches, item.accountId, item.accountTitle) || '',
		categoryId: getId(matches.categoryTitleMatches, item.categoryId, item.categoryTitle),
		categoryTitle: getId(matches.categoryIdMatches, item.categoryId, item.categoryTitle),
		billId: getId(matches.billTitleMatches, item.billId, item.billTitle),
		billTitle: getTitle(matches.billIdMatches, item.billId, item.billTitle),
		budgetId: getId(matches.budgetTitleMatches, item.budgetId, item.budgetTitle),
		budgetTitle: getTitle(matches.budgetIdMatches, item.budgetId, item.budgetTitle),
		tagId: getId(matches.tagTitleMatches, item.tagId, item.tagTitle),
		tagTitle: getTitle(matches.tagIdMatches, item.tagId, item.tagTitle),
		createdAt: item.createdAt,
		updatedAt: item.updatedAt
	}));

	return mappedData;
};
