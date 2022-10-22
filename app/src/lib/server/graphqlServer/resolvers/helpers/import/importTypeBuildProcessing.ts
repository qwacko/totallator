import type { z } from 'zod';
import type {
	ImportAccountProcessed,
	ImportBillProcessed,
	ImportBudgetProcessed,
	ImportCategoryProcessed,
	ImportChecksReturn,
	ImportTagProcessed
} from '$lib/server/graphqlServer/types/generated-resolvers';
import type { importJSONValidation } from '$lib/utils/importValidation/importJSONValidation';
import prisma from '$lib/server/prisma/client';
import type { Tag, Category, Bill, Budget, Account } from '@prisma/client';
import { pick } from 'lodash-es';

export type allImportType = z.infer<typeof importJSONValidation>;
type tagItemType = z.infer<typeof importJSONValidation>['tags'][0];
type categoryItemType = z.infer<typeof importJSONValidation>['categories'][0];
type billItemType = z.infer<typeof importJSONValidation>['bills'][0];
type budgetImportTypeFromAllImport = z.infer<typeof importJSONValidation>['budgets'][0];
type accountItemType = z.infer<typeof importJSONValidation>['accounts'][0];
type journalItemType = z.infer<typeof importJSONValidation>['journalEntries'][0];

const accountKeys = [
	'id',
	'status',
	'title',
	'accountGroup',
	'accountGroup2',
	'accountGroup3',
	'startDate',
	'endDate',
	'isCash',
	'isNetWorth',
	'type',
	'createdAt',
	'updatedAt'
] as const;

export const accountBuildProcessing: buildProcessing<
	ImportAccountProcessed,
	string,
	Account,
	accountItemType
> = {
	buildIdList: (data) => data.accounts.map((item) => item.id).filter((item) => item) as string[],
	getIdFromJournal: (data) => data.accountId,
	getDetailFromJournal: (data) => data.accountTitle,
	getDetailFromPrismaItemType: (data) => data.title,
	getDetailFromImportItemType: (data) => data.title,
	compareDetail: (item1, item2) => (item1 && item2 ? item1 === item2 : false),
	getDataFromPrisma: async (ids, details, accountGroupingId) =>
		prisma.account.findMany({
			where: {
				OR: [
					{ id: { in: ids }, accountGroupingId: { equals: accountGroupingId } },
					{ title: { in: details }, accountGroupingId: { equals: accountGroupingId } }
				]
			}
		}),
	getImportTypeFromAllImport: (data) => data.accounts,
	importTypeToReturnType: (data) =>
		data.map((item) => ({
			...pick(item, accountKeys),
			processingResult: {}
		})),
	prismaTypeToReturnType: (item) => pick(item, accountKeys),
	mergeImportAndPrismaType: (importData, prismaData) => ({
		...pick(prismaData, accountKeys),
		...pick(importData, accountKeys)
	}),
	compareImportTypeToPrismaType: (importData, prismaData) =>
		compareValues(importData, prismaData, accountKeys)
};

const compareValues = (
	importData: { [key: string]: unknown; createdAt?: Date; updatedAt?: Date },
	prismaData: { [key: string]: unknown; createdAt: Date; updatedAt: Date },
	keys: readonly string[]
) => {
	console.log({ dataA: importData, dataB: prismaData, keys });

	const useKeys = keys.filter((item) => item !== 'createdAt' && item !== 'updatedAt');

	const keysEqual = useKeys.reduce((prev, current) => {
		const dataChanged = importData[current] !== prismaData[current];

		return prev ? true : dataChanged;
	}, false);

	const updatedAtEqual = importData.updatedAt
		? importData.updatedAt.getTime() === prismaData.updatedAt.getTime()
		: true;
	const createdAtEqual = importData.createdAt
		? importData.createdAt.getTime() === prismaData.createdAt.getTime()
		: true;

	return keysEqual && updatedAtEqual && createdAtEqual;
};

//BILLS
////////////////////////

const billKeys = ['id', 'status', 'title', 'createdAt', 'updatedAt'] as const;

export const billBuildProcessing: buildProcessing<ImportBillProcessed, string, Bill, billItemType> =
	{
		buildIdList: (data) => data.bills.map((item) => item.id).filter((item) => item) as string[],
		getIdFromJournal: (data) => data.billId,
		getDetailFromJournal: (data) => data.billTitle,
		getDetailFromPrismaItemType: (data) => data.title,
		getDetailFromImportItemType: (data) => data.title,
		compareDetail: (item1, item2) => (item1 && item2 ? item1 === item2 : false),
		getDataFromPrisma: async (ids, details, accountGroupingId) =>
			prisma.bill.findMany({
				where: {
					OR: [
						{ id: { in: ids }, accountGroupingId: { equals: accountGroupingId } },
						{ title: { in: details }, accountGroupingId: { equals: accountGroupingId } }
					]
				}
			}),
		getImportTypeFromAllImport: (data) => data.bills,
		importTypeToReturnType: (data) =>
			data.map((item) => ({
				...pick(item, billKeys),
				processingResult: {}
			})),
		prismaTypeToReturnType: (item) => pick(item, billKeys),
		mergeImportAndPrismaType: (importData, prismaData) => ({
			...pick(prismaData, billKeys),
			...pick(importData, billKeys)
		}),
		compareImportTypeToPrismaType: (importData, prismaData) =>
			compareValues(importData, prismaData, billKeys)
	};

//BUDGETS
///////////////////////////

const budgetKeys = ['id', 'status', 'title', 'createdAt', 'updatedAt'] as const;

export const budgetBuildProcessing: buildProcessing<
	ImportBudgetProcessed,
	string,
	Budget,
	budgetImportTypeFromAllImport
> = {
	buildIdList: (data) => data.budgets.map((item) => item.id).filter((item) => item) as string[],
	getIdFromJournal: (data) => data.budgetId,
	getDetailFromJournal: (data) => data.budgetTitle,
	getDetailFromPrismaItemType: (data) => data.title,
	getDetailFromImportItemType: (data) => data.title,
	compareDetail: (item1, item2) => (item1 && item2 ? item1 === item2 : false),
	getDataFromPrisma: async (ids, details, accountGroupingId) =>
		prisma.budget.findMany({
			where: {
				OR: [
					{ id: { in: ids }, accountGroupingId: { equals: accountGroupingId } },
					{ title: { in: details }, accountGroupingId: { equals: accountGroupingId } }
				]
			}
		}),
	getImportTypeFromAllImport: (data) => data.budgets,
	importTypeToReturnType: (data) =>
		data.map((item) => ({
			...pick(item, budgetKeys),
			processingResult: {}
		})),
	prismaTypeToReturnType: (item) => pick(item, budgetKeys),
	mergeImportAndPrismaType: (importData, prismaData) => ({
		...pick(prismaData, budgetKeys),
		...pick(importData, budgetKeys)
	}),
	compareImportTypeToPrismaType: (importData, prismaData) =>
		compareValues(importData, prismaData, budgetKeys)
};

//TAGS
/////////////////////////////

const tagKeys = ['id', 'status', 'title', 'single', 'group', 'createdAt', 'updatedAt'] as const;

export const tagBuildProcessing: buildProcessing<ImportTagProcessed, string, Tag, tagItemType> = {
	buildIdList: (data) => data.tags.map((item) => item.id).filter((item) => item) as string[],
	getIdFromJournal: (data) => data.tagId,
	getDetailFromJournal: (data) => data.tagTitle,
	getDetailFromPrismaItemType: (data) => data.title,
	getDetailFromImportItemType: (data) => data.title,
	compareDetail: (item1, item2) => (item1 && item2 ? item1 === item2 : false),
	getDataFromPrisma: async (ids, details, accountGroupingId) =>
		prisma.tag.findMany({
			where: {
				OR: [
					{ id: { in: ids }, accountGroupingId: { equals: accountGroupingId } },
					{ title: { in: details }, accountGroupingId: { equals: accountGroupingId } }
				]
			}
		}),
	getImportTypeFromAllImport: (data) => data.tags,
	importTypeToReturnType: (data) =>
		data.map((item) => ({
			...pick(item, tagKeys),
			processingResult: {}
		})),

	prismaTypeToReturnType: (item) => pick(item, tagKeys),
	mergeImportAndPrismaType: (importData, prismaData) => ({
		...pick(prismaData, tagKeys),
		...pick(importData, tagKeys)
	}),
	compareImportTypeToPrismaType: (importData, prismaData) =>
		compareValues(importData, prismaData, tagKeys)
};

const categoryKeys = [
	'id',
	'status',
	'title',
	'single',
	'group',
	'createdAt',
	'updatedAt'
] as const;

export const categoryBuildProcessing: buildProcessing<
	ImportCategoryProcessed,
	string,
	Category,
	categoryItemType
> = {
	buildIdList: (data) => data.categories.map((item) => item.id).filter((item) => item) as string[],
	getIdFromJournal: (data) => data.categoryId,
	getDetailFromJournal: (data) => data.categoryTitle,
	getDetailFromPrismaItemType: (data) => data.title,
	getDetailFromImportItemType: (data) => data.title,
	compareDetail: (item1, item2) => (item1 && item2 ? item1 === item2 : false),
	getDataFromPrisma: async (ids, details, accountGroupingId) =>
		prisma.category.findMany({
			where: {
				OR: [
					{ id: { in: ids }, accountGroupingId: { equals: accountGroupingId } },
					{ title: { in: details }, accountGroupingId: { equals: accountGroupingId } }
				]
			}
		}),
	getImportTypeFromAllImport: (data) => data.categories,
	importTypeToReturnType: (data) =>
		data.map((item) => ({
			...pick(item, categoryKeys),
			processingResult: {}
		})),
	prismaTypeToReturnType: (item) => pick(item, categoryKeys),
	mergeImportAndPrismaType: (importData, prismaData) => ({
		...pick(prismaData, categoryKeys),
		...pick(importData, categoryKeys)
	}),
	compareImportTypeToPrismaType: (importData, prismaData) =>
		compareValues(importData, prismaData, categoryKeys)
};

export type buildProcessing<
	ReturnType extends {
		processingResult?: ImportChecksReturn | undefined | null;
		[key: string]: unknown;
	},
	itemDetail,
	PrismaItemType extends { id: string; [key: string]: unknown },
	ImportType extends { id: string; [key: string]: unknown }
> = {
	buildIdList: (data: z.infer<typeof importJSONValidation>) => string[];
	getIdFromJournal: (data: journalItemType) => string | undefined;
	getDetailFromJournal: (data: journalItemType) => itemDetail | undefined;
	getDetailFromPrismaItemType: (data: PrismaItemType) => itemDetail | undefined;
	getDetailFromImportItemType: (data: ImportType) => itemDetail | undefined;
	compareDetail: (data1: itemDetail | undefined, data2: itemDetail | undefined) => boolean;
	getDataFromPrisma: (
		ids: string[],
		itemDetails: itemDetail[],
		accountGroupingId: string
	) => Promise<PrismaItemType[]>;
	getImportTypeFromAllImport: (data: allImportType) => ImportType[];
	importTypeToReturnType: (data: ImportType[]) => ReturnType[];
	prismaTypeToReturnType: (data: PrismaItemType) => ReturnType;
	mergeImportAndPrismaType: (importData: ImportType, prismaData: PrismaItemType) => ReturnType;
	compareImportTypeToPrismaType: (importData: ImportType, prismaData: PrismaItemType) => boolean;
};
