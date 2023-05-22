import type { BulkUpgradeAccountGroupingValidationType } from '$lib/validation/accountGrouping/bulkUpgradeAccountGroupingValidation';

export type SeedInputData = {
	assetAccounts: readonly string[];
	assetAccountsSample: readonly string[];
	liabilityAccounts: readonly string[];
	liabilityAccountsSample: readonly string[];
	incomeAccounts: readonly string[];
	incomeAccountsSample: readonly string[];
	expenseAccounts: readonly string[];
	expenseAccountsSample: readonly string[];
	tags: readonly string[];
	tagsSample: readonly string[];
	bills: readonly string[];
	billsSample: readonly string[];
	budgets: readonly string[];
	budgetsSample: readonly string[];
	categories: readonly string[];
	categoriesSample: readonly string[];
};
export const mergeSeedItems = ({
	sample,
	data,
	includeAccounts
}: {
	sample: boolean;
	includeAccounts: boolean;
	data: SeedInputData;
}): Pick<
	BulkUpgradeAccountGroupingValidationType,
	| 'createAssetAccountTitles'
	| 'createLiabilityAccountTitles'
	| 'createIncomeAccountTitles'
	| 'createExpenseAccountTitles'
	| 'createBillTitles'
	| 'createBudgetTitles'
	| 'createCategoryTitles'
	| 'createTagTitles'
> => {
	return {
		createAssetAccountTitles: singleMerge({
			data: data.assetAccounts,
			sampleData: data.assetAccountsSample,
			sample,
			include: includeAccounts
		}),
		createLiabilityAccountTitles: singleMerge({
			data: data.liabilityAccounts,
			sampleData: data.liabilityAccountsSample,
			sample,
			include: includeAccounts
		}),
		createIncomeAccountTitles: singleMerge({
			data: data.incomeAccounts,
			sampleData: data.incomeAccountsSample,
			sample,
			include: includeAccounts
		}),
		createExpenseAccountTitles: singleMerge({
			data: data.expenseAccounts,
			sampleData: data.expenseAccountsSample,
			sample,
			include: includeAccounts
		}),
		createBillTitles: singleMerge({
			data: data.bills,
			sampleData: data.billsSample,
			sample,
			include: true
		}),
		createBudgetTitles: singleMerge({
			data: data.budgets,
			sampleData: data.budgetsSample,
			sample,
			include: true
		}),
		createCategoryTitles: singleMerge({
			data: data.categories,
			sampleData: data.categoriesSample,
			sample,
			include: true
		}),
		createTagTitles: singleMerge({
			data: data.tags,
			sampleData: data.tagsSample,
			sample,
			include: true
		})
	};
};

const singleMerge = ({
	data,
	sampleData,
	sample,
	include
}: {
	data: string[] | readonly string[] | undefined;
	sampleData: string[] | readonly string[] | undefined;
	sample: boolean;
	include: boolean;
}) => {
	if (!include) {
		return undefined;
	}
	return [...(data || []), ...(sample ? sampleData || [] : [])];
};
