import type {
	ImportDataProcessed,
	ImportDataReturnStatus
} from '$lib/server/graphqlServer/types/generated-resolvers';
import prisma from '$lib/server/prisma/client';
import { format, parse } from 'date-fns';

export const categoriseJournalImports = async (
	data: ImportDataProcessed[],
	accountGroupingId: string
): Promise<ImportDataProcessed[]> => {
	const journalIdsInData = new Set(
		data.map((item) => item.journalId).filter((item) => item) as string[]
	);

	const foundJournalsById = await prisma.journalEntry.findMany({
		where: { id: { in: [...journalIdsInData] }, accountGroupingId: { equals: accountGroupingId } },
		select: { id: true }
	});

	const foundJournalsByIdSet = new Set(foundJournalsById.map((item) => item.id));

	const transactionIdsInData = new Set(
		data.map((item) => item.transactionId).filter((item) => item) as string[]
	);

	const foundTransactionsById = await prisma.journalEntry.findMany({
		where: {
			id: { in: [...transactionIdsInData] },
			accountGroupingId: { equals: accountGroupingId }
		},
		select: { id: true }
	});

	const foundTransactionsByIdSet = new Set(foundTransactionsById.map((item) => item.id));

	const searchDates = new Set(data.map((item) => item.date));
	const searchDescriptions = new Set(data.map((item) => item.description));
	const searchAmounts = new Set(data.map((item) => item.amount));
	const searchAccounts = new Set(
		data.map((item) => item.accountId).filter((item) => item) as string[]
	);

	console.log('');

	const foundSimilarJournals = await prisma.journalEntry.findMany({
		where: {
			date: { in: [...searchDates].map((date) => parse(date, 'yyyy-MM-dd', new Date())) },
			description: { in: [...searchDescriptions] },
			amount: { in: [...searchAmounts] },
			accountId: { in: [...searchAccounts] }
		},
		select: { id: true, date: true, amount: true, description: true, accountId: true }
	});

	const newData = await Promise.all(
		data.map(async (row) => {
			const status: ImportDataReturnStatus[] = [];

			if (row.journalId && foundJournalsByIdSet.has(row.journalId)) {
				status.push('journalIdMatch');
			}

			if (row.transactionId && foundTransactionsByIdSet.has(row.transactionId)) {
				status.push('transactionIdMatch');
			}

			const similarJournals = foundSimilarJournals.filter((journal) => {
				const similar =
					journal.accountId === row.accountId &&
					journal.amount === row.amount &&
					format(journal.date, 'yyyy-MM-dd') === row.date &&
					journal.description === row.description;

				return similar;
			});

			if (similarJournals.length > 0) {
				status.push('similarJournalFound');
				row.foundJournalID = similarJournals[0].id;
			}

			return { ...row, status };
		})
	);

	return newData;
};
