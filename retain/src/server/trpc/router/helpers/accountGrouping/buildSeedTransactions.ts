import { faker } from '@faker-js/faker';
import { TRPCError } from '@trpc/server';
import { addDays, differenceInDays, subYears } from 'date-fns';

import type { SeedAccountGroupingValidationType } from 'src/utils/validation/accountGrouping/seedAccountGroupingValidation';
import type { createSimpleTransactionValidationType } from 'src/utils/validation/journalEntries/createJournalValidation';

import { type SeedInputData, mergeSeedItems } from './mergeSeedItems';

export type DefaultTransactionSeedingConfig<
	Accounts extends string,
	Categories extends string,
	Bills extends string,
	Budgets extends string,
	Tags extends string
> = {
	descriptions: string[];
	dateStartPercentage?: number;
	dateEndPercentage?: number;
	amountMax?: number;
	amountMin?: number;
	fromAccounts: Accounts[];
	toAccounts: Accounts[];
	bills?: (Bills | undefined)[];
	budgets?: (Budgets | undefined)[];
	categories?: (Categories | undefined)[];
	tags?: (Tags | undefined)[];
	daysSinceReconciled?: number;
	daysSinceChecked?: number;
	daysSinceComplete?: number;
	weighting: number;
};

type DefaultTransactionSeedingConfigString = DefaultTransactionSeedingConfig<
	string,
	string,
	string,
	string,
	string
>;

export const buildSeedTransactions = ({
	inputConfig,
	transConfig,
	queryConfig
}: {
	inputConfig: SeedInputData;
	transConfig: DefaultTransactionSeedingConfigString[];
	queryConfig: SeedAccountGroupingValidationType;
}): createSimpleTransactionValidationType[] => {
	checkSeedTransactionConfig({ inputConfig, queryConfig, transConfig });

	const totalWeighting = transConfig.reduce((prev, current) => prev + current.weighting, 0);
	const transPerWeighting = Math.ceil(queryConfig.transactionCount / totalWeighting);

	const endDate = new Date();
	const startDate = subYears(endDate, queryConfig.numberYears);
	const dateSpan = differenceInDays(endDate, startDate);

	const returnTrans: createSimpleTransactionValidationType[] = [];

	transConfig.forEach((config) => {
		const numberGenerated = Math.ceil(config.weighting * transPerWeighting);
		const startDatePercent =
			'dateStartPercentage' in config ? (config.dateStartPercentage || 0.0) / 100.0 : 0;
		const endDatePercent =
			'dateEndPercentage' in config ? (config.dateEndPercentage || 100.0) / 100.0 : 1;
		const thisStartDays = startDatePercent * dateSpan;
		const thisEndDays = endDatePercent * dateSpan;
		const thisStartDate = addDays(startDate, thisStartDays);
		const thisEndDate = addDays(startDate, thisEndDays);

		//Generate the transactions
		for (let i = 0; i < numberGenerated; i++) {
			const transDate = faker.date.between(thisStartDate, thisEndDate);
			transDate.setHours(0, 0, 0, 0);
			const daysSinceTrans = differenceInDays(transDate, endDate);
			returnTrans.push({
				description: faker.helpers.arrayElement(config.descriptions),
				accountGroupingId: queryConfig.accountGroupingId,
				amount: faker.datatype.number({
					min: 'amountMin' in config ? config.amountMin : 0,
					max: 'amountMax' in config ? config.amountMax : 1000,
					precision: 0.01
				}),
				date: transDate,
				fromAccountId: faker.helpers.arrayElement(config.fromAccounts),
				toAccountId: faker.helpers.arrayElement(config.toAccounts),
				billId: config.bills ? faker.helpers.arrayElement(config.bills) : undefined,
				budgetId: config.budgets ? faker.helpers.arrayElement(config.budgets) : undefined,
				categoryId: config.categories ? faker.helpers.arrayElement(config.categories) : undefined,
				tagId: config.tags ? faker.helpers.arrayElement(config.tags) : undefined,
				reconciled: daysSinceTrans > (config.daysSinceReconciled || 0),
				dataChecked: daysSinceTrans > (config.daysSinceChecked || 0),
				complete: daysSinceTrans > (config.daysSinceComplete || 0)
			});
		}
	});

	return returnTrans;
};

const checkSeedTransactionConfig = ({
	inputConfig,
	transConfig,
	queryConfig
}: {
	inputConfig: SeedInputData;
	transConfig: DefaultTransactionSeedingConfigString[];
	queryConfig: SeedAccountGroupingValidationType;
}) => {
	//Check that all of the transConfig data is in the inputConfig
	const errors: string[] = [];
	const combinedSeedData = mergeSeedItems({
		sample: queryConfig.seedAsSample,
		data: inputConfig,
		includeAccounts: queryConfig.includeAccounts
	});

	const checkAccounts = [
		...(combinedSeedData.createAssetAccountTitles || []),
		...(combinedSeedData.createLiabilityAccountTitles || []),
		...(combinedSeedData.createIncomeAccountTitles || []),
		...(combinedSeedData.createExpenseAccountTitles || [])
	];
	const checkBills = combinedSeedData.createBillTitles || [];
	const checkBudgets = combinedSeedData.createBudgetTitles || [];
	const checkCategories = combinedSeedData.createCategoryTitles || [];
	const checkTags = combinedSeedData.createTagTitles || [];

	transConfig.forEach((trans, index) => {
		const checkSingle = ({
			data,
			options,
			title
		}: {
			data: (string | undefined)[] | undefined;
			options: string[];
			title: string;
		}) => {
			data &&
				data.map((item) => {
					if (item && !options.includes(item)) {
						console.log(`Config ${index}. Seeding ${title} Not Found ${item}`);
						errors.push(`Config ${index}. Seeding ${title} Not Found ${item}`);
					}
				});
		};

		checkSingle({
			data: trans.fromAccounts,
			options: checkAccounts,
			title: 'From Account'
		});
		checkSingle({
			data: trans.toAccounts,
			options: checkAccounts,
			title: 'To Account'
		});
		checkSingle({
			data: trans.bills,
			options: checkBills,
			title: 'Bill'
		});
		checkSingle({
			data: trans.budgets,
			options: checkBudgets,
			title: 'Budget'
		});
		checkSingle({
			data: trans.categories,
			options: checkCategories,
			title: 'Category'
		});
		checkSingle({
			data: trans.tags,
			options: checkTags,
			title: 'Tag'
		});
	});

	if (errors.length > 0) {
		console.log('Seeding Errors Found', errors);
		throw new TRPCError({
			message: 'Errors with seeding config',
			code: 'INTERNAL_SERVER_ERROR'
		});
	}
};
