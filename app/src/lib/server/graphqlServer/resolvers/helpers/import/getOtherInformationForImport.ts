import type {
	ImportAccountProcessed,
	ImportBillProcessed,
	ImportBudgetProcessed,
	ImportCategoryProcessed,
	ImportChecksReturn,
	ImportTagProcessed
} from '$lib/server/graphqlServer/types/generated-resolvers';
import {
	tagBuildProcessing,
	categoryBuildProcessing,
	billBuildProcessing,
	budgetBuildProcessing,
	accountBuildProcessing
} from './importTypeBuildProcessing';
import type { allImportType, buildProcessing } from './importTypeBuildProcessing';

export const getOtherInformationForImport = async (
	data: allImportType,
	accountGroupingId: string
) => {
	console.log({ data, accountGroupingId });

	const tagsToReturn: ImportTagProcessed[] = await buildReturnItemsList(
		data,
		accountGroupingId,
		tagBuildProcessing
	);
	const categoriesToReturn: ImportCategoryProcessed[] = await buildReturnItemsList(
		data,
		accountGroupingId,
		categoryBuildProcessing
	);
	const billsToReturn: ImportBillProcessed[] = await buildReturnItemsList(
		data,
		accountGroupingId,
		billBuildProcessing
	);
	const budgetsToReturn: ImportBudgetProcessed[] = await buildReturnItemsList(
		data,
		accountGroupingId,
		budgetBuildProcessing
	);
	const accountsToReturn: ImportAccountProcessed[] = await buildReturnItemsList(
		data,
		accountGroupingId,
		accountBuildProcessing
	);

	return {
		tags: tagsToReturn,
		categories: categoriesToReturn,
		bills: billsToReturn,
		budgets: budgetsToReturn,
		accounts: accountsToReturn
	};
};

async function buildReturnItemsList<
	ReturnType extends {
		processingResult?: ImportChecksReturn | undefined | null;
		[key: string]: unknown;
	},
	ItemDetail,
	PrismaItemType extends { id: string; [key: string]: unknown },
	ImportType extends { id: string; [key: string]: unknown }
>(
	data: allImportType,
	accountGroupingId: string,
	processing: buildProcessing<ReturnType, ItemDetail, PrismaItemType, ImportType>
) {
	const itemIdsInData = processing.buildIdList(data);
	const itemIdsInJournals = data.journalEntries
		.map(processing.getIdFromJournal)
		.filter((item) => item) as string[];

	const combinedItemIdsToQuery = [...new Set([...itemIdsInData, ...itemIdsInJournals])];

	const dataDetailInJournals = data.journalEntries
		.map(processing.getDetailFromJournal)
		.filter((item) => item) as ItemDetail[];

	const itemDetailListToQuery = dataDetailInJournals;

	const itemsFound = await processing.getDataFromPrisma(
		combinedItemIdsToQuery,
		itemDetailListToQuery,
		accountGroupingId
	);

	const dataToReturn: ReturnType[] = itemsFound.map((foundItem) => {
		const processingResult: ImportChecksReturn = {};

		//Check if the item is found in the data list, and highlight as such.
		const itemIdInDataList = processing
			.getImportTypeFromAllImport(data)
			.find((item) => item.id === foundItem.id);

		//Check if the item is found in the journal list, and hightlight as such
		const itemIdInJournalList = data.journalEntries.find(
			(item) => processing.getIdFromJournal(item) === foundItem.id
		);
		const itemDetailInJournalList = itemIdInJournalList
			? undefined
			: data.journalEntries.find((item) =>
					processing.compareDetail(
						processing.getDetailFromJournal(item),
						processing.getDetailFromPrismaItemType(foundItem)
					)
			  );

		const journalListTitleFound = itemIdInJournalList
			? processing.compareDetail(
					processing.getDetailFromJournal(itemIdInJournalList),
					processing.getDetailFromPrismaItemType(foundItem)
			  )
			: Boolean(itemDetailInJournalList);

		const journalListIdFound = Boolean(itemIdInJournalList);
		const dataListIdFound = Boolean(itemIdInDataList);
		if (dataListIdFound) processingResult.idInItemList = true;
		if (journalListIdFound) processingResult.idInJournals = true;
		if (journalListTitleFound) processingResult.dataInJournals = true;

		const defaultReturn: ReturnType = {
			...processing.prismaTypeToReturnType(foundItem),
			processingResult
		};

		if (itemIdInDataList) {
			const dataChanged = processing.compareImportTypeToPrismaType(itemIdInDataList, foundItem);
			if (dataChanged) {
				processingResult.dataChanged = true;
				return {
					...processing.mergeImportAndPrismaType(itemIdInDataList, foundItem),
					processingResult
				};
			}
			return defaultReturn;
		} else {
			return defaultReturn;
		}
	});

	//Make Return List have placeholders for items that id in item list cant be found.
	//Add errors for journals that don't have the selected item (id or detail)

	const idsFound = dataToReturn.map((item) => item.id);
	const idsNotFound = processing
		.getImportTypeFromAllImport(data)
		.filter((item) => !idsFound.includes(item.id));
	const newtoReturn = processing.importTypeToReturnType(idsNotFound);

	return [...dataToReturn, ...newtoReturn];
}
