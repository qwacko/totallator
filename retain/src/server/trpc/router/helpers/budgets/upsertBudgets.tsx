import type { Budget, Prisma, PrismaClient } from '@prisma/client';

import { type BulkUpgradeAccountGroupingValidationType } from 'src/utils/validation/accountGrouping/bulkUpgradeAccountGroupingValidation';

import { buildSearchIDList } from '../buildSearchIDList';
import { populateRemainingIds } from '../populateRemainingIds';
import { type UpsertReturnType } from '../types';
import { type UpsertBudgetData, upsertBudget } from './upsertBudget';

export type UpsertBudgetsReturnType = UpsertReturnType<Budget>;

export const upsertBudgets = async ({
	data,
	prisma,
	userId,
	userIsAdmin
}: {
	data: BulkUpgradeAccountGroupingValidationType;
	prisma: PrismaClient | PrismaClient | Prisma.TransactionClient;
	userId: string;
	userIsAdmin?: boolean;
}): Promise<UpsertBudgetsReturnType> => {
	const accountGroupingId = data.accountGroupingId;

	const returnData: UpsertBudgetsReturnType = {
		idLookup: {},
		nameLookup: {},
		allLookup: {}
	};

	const listData: UpsertBudgetData[] = data.createBudgetTitles
		? data.createBudgetTitles.map((item) => ({ title: item }))
		: [];

	const upsertData = data.upsertBudgets ? data.upsertBudgets : [];

	const list: ((typeof upsertData)[0] | UpsertBudgetData)[] = [...upsertData, ...listData];
	if (list) {
		await Promise.all(
			list.map(async (currentItem) => {
				const upsertedBudget = await upsertBudget({
					prisma,
					accountGroupingId,
					id: 'id' in currentItem && currentItem.id ? currentItem.id : undefined,
					data: currentItem,
					userId,
					userAdmin: userIsAdmin,
					action: 'Upsert'
				});
				returnData.idLookup[upsertedBudget.id] = upsertedBudget;
				if ('id' in currentItem && currentItem.id) {
					returnData.idLookup[currentItem.id] = upsertedBudget;
				}
				returnData.nameLookup[upsertedBudget.title] = upsertedBudget;
			})
		);
	}

	returnData.allLookup = { ...returnData.idLookup, ...returnData.idLookup };

	await populateRemainingIds({
		returnData,
		idList: buildSearchIDList({ data, key: 'budgetId' }),
		itemsType: 'Budgets',
		getMatching: async (ids) =>
			await prisma.budget.findMany({
				where: { id: { in: ids }, accountGroupingId }
			})
	});

	return returnData;
};
