import type { ImportChecksReturn } from '$lib/server/graphqlServer/types/generated-resolvers';
import {
	tagBuildProcessing,
	categoryBuildProcessing,
	billBuildProcessing,
	budgetBuildProcessing,
	accountBuildProcessing
} from './importTypeBuildProcessing';
import type { allImportType, buildProcessing } from './importTypeBuildProcessing';
import type { ImportErrorType } from '$lib/components/Import/handleImport';

export const getOtherInformationForImport = async (
	data: allImportType,
	accountGroupingId: string
) => {
	const tagsToReturn = await buildReturnItemsList(
		data,
		accountGroupingId,
		tagBuildProcessing,
		'Tag'
	);
	const categoriesToReturn = await buildReturnItemsList(
		data,
		accountGroupingId,
		categoryBuildProcessing,
		'Category'
	);
	const billsToReturn = await buildReturnItemsList(
		data,
		accountGroupingId,
		billBuildProcessing,
		'Bill'
	);
	const budgetsToReturn = await buildReturnItemsList(
		data,
		accountGroupingId,
		budgetBuildProcessing,
		'Budget'
	);
	const accountsToReturn = await buildReturnItemsList(
		data,
		accountGroupingId,
		accountBuildProcessing,
		'Account'
	);

	const errors = [
		...tagsToReturn.errors,
		...categoriesToReturn.errors,
		...billsToReturn.errors,
		...budgetsToReturn.errors,
		...accountsToReturn.errors
	];
	return {
		data: {
			tags: tagsToReturn.data,
			categories: categoriesToReturn.data,
			bills: billsToReturn.data,
			budgets: budgetsToReturn.data,
			accounts: accountsToReturn.data
		},
		errors
	};
};

export async function buildReturnItemsList<
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
	processing: buildProcessing<ReturnType, ItemDetail, PrismaItemType, ImportType>,
	title: string
) {
	const itemIdsInData = processing.buildIdList(data);
	const itemIdsInJournals = data.journals
		.map(processing.getIdFromJournal)
		.filter((item) => item) as string[];

	const combinedItemIdsToQuery = [...new Set([...itemIdsInData, ...itemIdsInJournals])];

	const dataDetailInJournals = data.journals
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
		const itemIdInJournalList = data.journals.find(
			(item) => processing.getIdFromJournal(item) === foundItem.id
		);
		const itemDetailInJournalList = itemIdInJournalList
			? undefined
			: data.journals.find((item) =>
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

	const idsFound = dataToReturn.map((item) => item.id);
	const detailsFound = dataToReturn
		.map(processing.getDetailFromReturnType)
		.filter((item) => item) as ItemDetail[];
	const idsNotFound = processing
		.getImportTypeFromAllImport(data)
		.filter((item) => !idsFound.includes(item.id));
	const newtoReturn = processing.importTypeToReturnType(idsNotFound);

	//Add errors for journals that don't have the selected item (id or detail)
	const idsInJournalListNotFound = itemIdsInJournals
		.map((item, index) => ({ id: item, index }))
		.filter((item) => !idsFound.includes(item.id));
	const itemDetailInJournalListNotFound = dataDetailInJournals
		.map((item, index) => ({ data: item, index }))
		.filter((item) =>
			Boolean(detailsFound.find((detail) => processing.compareDetail(detail, item.data)))
		);

	const errors: ImportErrorType[] = [
		...idsInJournalListNotFound.map((item) => ({
			message: `${title} ID ${item.id} found in journals, but not found in import or database`,
			title: `${title} Missing`,
			location: `Journal List - Row ${item.index}`
		})),
		...itemDetailInJournalListNotFound.map((item) => ({
			message: `${title} Detail ${JSON.stringify(
				item.data
			)} found in journals, but not found in import or database`,
			title: `${title} Missing`,
			location: `Journal List - Row ${item.index}`
		}))
	];

	return { data: [...dataToReturn, ...newtoReturn], errors };
}
