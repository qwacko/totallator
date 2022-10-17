import prisma from '$lib/server/prisma/client';
import type { importGetUniqueItemsReturnType } from './importGetUniqueItems';

export async function checkImportInfo(
	uniqueInfo: importGetUniqueItemsReturnType,
	accountGroupingId: string
) {
	const accountTitleMatchesPromise = prisma.account.findMany({
		where: { title: { in: uniqueInfo.accountTitles }, accountGroupingId: accountGroupingId },
		select: { id: true, title: true }
	});
	const accountIdMatchesPromise = prisma.account.findMany({
		where: { id: { in: uniqueInfo.accountIds }, accountGroupingId: accountGroupingId },
		select: { id: true, title: true }
	});
	const categoryTitleMatchesPromise = prisma.category.findMany({
		where: { title: { in: uniqueInfo.categoryTitles }, accountGroupingId: accountGroupingId },
		select: { id: true, title: true }
	});
	const categoryIdMatchesPromise = prisma.category.findMany({
		where: { id: { in: uniqueInfo.categoryIds }, accountGroupingId: accountGroupingId },
		select: { id: true, title: true }
	});
	const billTitleMatchesPromise = prisma.bill.findMany({
		where: { title: { in: uniqueInfo.billTitles }, accountGroupingId: accountGroupingId },
		select: { id: true, title: true }
	});
	const billIdMatchesPromise = prisma.bill.findMany({
		where: { id: { in: uniqueInfo.billIds }, accountGroupingId: accountGroupingId },
		select: { id: true, title: true }
	});
	const budgetTitleMatchesPromise = prisma.budget.findMany({
		where: { title: { in: uniqueInfo.budgetTitles }, accountGroupingId: accountGroupingId },
		select: { id: true, title: true }
	});
	const budgetIdMatchesPromise = prisma.budget.findMany({
		where: { id: { in: uniqueInfo.budgetIds }, accountGroupingId: accountGroupingId },
		select: { id: true, title: true }
	});
	const tagTitleMatchesPromise = prisma.tag.findMany({
		where: { title: { in: uniqueInfo.tagTitles }, accountGroupingId: accountGroupingId },
		select: { id: true, title: true }
	});
	const tagIdMatchesPromise = prisma.tag.findMany({
		where: { id: { in: uniqueInfo.tagIds }, accountGroupingId: accountGroupingId },
		select: { id: true, title: true }
	});

	const accountTitleMatches = await accountTitleMatchesPromise;
	const accountIdMatches = await accountIdMatchesPromise;
	const categoryTitleMatches = await categoryTitleMatchesPromise;
	const categoryIdMatches = await categoryIdMatchesPromise;
	const billTitleMatches = await billTitleMatchesPromise;
	const billIdMatches = await billIdMatchesPromise;
	const budgetTitleMatches = await budgetTitleMatchesPromise;
	const budgetIdMatches = await budgetIdMatchesPromise;
	const tagTitleMatches = await tagTitleMatchesPromise;
	const tagIdMatches = await tagIdMatchesPromise;

	const matches = {
		accountTitleMatches,
		accountIdMatches,
		categoryIdMatches,
		categoryTitleMatches,
		billTitleMatches,
		billIdMatches,
		budgetTitleMatches,
		budgetIdMatches,
		tagTitleMatches,
		tagIdMatches
	};

	let errorArray: { title: string; location: string; message: string }[] = [];

	const missingFoundItems = (searchList: string[], foundList: string[], title: string) => {
		if (searchList.length !== foundList.length) {
			const notFound = searchList.filter((item) => !foundList.includes(item));
			errorArray = [
				...errorArray,
				{
					title,
					location: title,
					message: `Not Found In Database Or Update Not Allowed - ${notFound.join(', ')}`
				}
			];
		}
	};

	missingFoundItems(
		uniqueInfo.accountTitles,
		accountTitleMatches.map((item) => item.title),
		'Account Titles'
	);
	missingFoundItems(
		uniqueInfo.accountIds,
		accountIdMatches.map((item) => item.id),
		'Account Ids'
	);
	missingFoundItems(
		uniqueInfo.categoryTitles,
		categoryTitleMatches.map((item) => item.title),
		'Category Titles'
	);
	missingFoundItems(
		uniqueInfo.categoryIds,
		categoryIdMatches.map((item) => item.id),
		'Category Ids'
	);
	missingFoundItems(
		uniqueInfo.billTitles,
		billTitleMatches.map((item) => item.title),
		'Bill Titles'
	);
	missingFoundItems(
		uniqueInfo.billIds,
		billIdMatches.map((item) => item.id),
		'Bill Ids'
	);
	missingFoundItems(
		uniqueInfo.budgetTitles,
		budgetTitleMatches.map((item) => item.title),
		'Budget Titles'
	);
	missingFoundItems(
		uniqueInfo.budgetIds,
		budgetIdMatches.map((item) => item.id),
		'Budget Ids'
	);
	missingFoundItems(
		uniqueInfo.tagTitles,
		tagTitleMatches.map((item) => item.title),
		'Tag Titles'
	);
	missingFoundItems(
		uniqueInfo.tagIds,
		tagIdMatches.map((item) => item.id),
		'Tag Ids'
	);
	return { errorArray, matches };
}

export type checkImportInfoReturn = Awaited<ReturnType<typeof checkImportInfo>>;
