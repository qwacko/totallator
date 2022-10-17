import type { importJournalsValidationReturnType } from '$lib/utils/importJournalsValidation';
import { uniq } from 'lodash-es';

export const removeEmpty = (data: (string | undefined)[]): string[] => {
	return uniq(
		data.reduce((prev, current) => {
			if (current) {
				return [...prev, current];
			}
			return prev;
		}, [] as string[])
	);
};

export const importGetUniqueItems = (validatedData: importJournalsValidationReturnType) => {
	const getUniqueList = (
		getValue: (data: importJournalsValidationReturnType[0]) => string | undefined
	) => {
		return removeEmpty(validatedData.map(getValue));
	};

	// Get Account Information
	const accountTitles = getUniqueList((item) => item.accountTitle);
	const accountIds = getUniqueList((item) => item.accountId);
	const categoryTitles = getUniqueList((item) => item.categoryTitle);
	const categoryIds = getUniqueList((item) => item.categoryId);
	const billTitles = getUniqueList((item) => item.billTitle);
	const billIds = getUniqueList((item) => item.billId);
	const budgetTitles = getUniqueList((item) => item.budgetTitle);
	const budgetIds = getUniqueList((item) => item.budgetId);
	const tagTitles = getUniqueList((item) => item.tagTitle);
	const tagIds = getUniqueList((item) => item.tagId);

	const uniqueInfo = {
		accountTitles,
		accountIds,
		categoryTitles,
		categoryIds,
		billTitles,
		billIds,
		budgetTitles,
		budgetIds,
		tagTitles,
		tagIds
	};

	return uniqueInfo;
};

export type importGetUniqueItemsReturnType = ReturnType<typeof importGetUniqueItems>;
