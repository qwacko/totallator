import type { Category, Prisma, PrismaClient } from '@prisma/client';

import { type BulkUpgradeAccountGroupingValidationType } from 'src/utils/validation/accountGrouping/bulkUpgradeAccountGroupingValidation';

import { buildSearchIDList } from '../buildSearchIDList';
import { populateRemainingIds } from '../populateRemainingIds';
import { type UpsertReturnType } from '../types';
import { type UpsertCategoryData, upsertCategory } from './upsertCategory';

export type UpsertCategoriesReturnType = UpsertReturnType<Category>;

export const upsertCategories = async ({
	data,
	prisma,
	userId,
	userIsAdmin
}: {
	data: BulkUpgradeAccountGroupingValidationType;
	prisma: PrismaClient | PrismaClient | Prisma.TransactionClient;
	userId: string;
	userIsAdmin?: boolean;
}): Promise<UpsertCategoriesReturnType> => {
	const accountGroupingId = data.accountGroupingId;

	const returnData: UpsertCategoriesReturnType = {
		idLookup: {},
		nameLookup: {},
		allLookup: {}
	};

	const listData: UpsertCategoryData[] = data.createCategoryTitles
		? data.createCategoryTitles.map((item) => {
				const [single, group] = item.split('/').reverse();
				return { group, single };
		  })
		: [];

	const upsertData = data.upsertCategories ? data.upsertCategories : [];

	const list: ((typeof upsertData)[0] | UpsertCategoryData)[] = [...upsertData, ...listData];
	if (list) {
		await Promise.all(
			list.map(async (currentItem) => {
				const upsertedCategory = await upsertCategory({
					prisma,
					accountGroupingId,
					id: 'id' in currentItem && currentItem.id ? currentItem.id : undefined,
					data: currentItem,
					userId,
					userAdmin: userIsAdmin,
					action: 'Upsert'
				});
				returnData.idLookup[upsertedCategory.id] = upsertedCategory;
				if ('id' in currentItem && currentItem.id) {
					returnData.idLookup[currentItem.id] = upsertedCategory;
				}
				returnData.nameLookup[upsertedCategory.title] = upsertedCategory;
			})
		);
	}

	returnData.allLookup = { ...returnData.idLookup, ...returnData.idLookup };

	await populateRemainingIds({
		returnData,
		idList: buildSearchIDList({ data, key: 'categoryId' }),
		itemsType: 'Categories',
		getMatching: async (ids) =>
			await prisma.category.findMany({
				where: { id: { in: ids }, accountGroupingId }
			})
	});

	return returnData;
};
