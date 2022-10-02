import type { Prisma } from '@prisma/client';

export async function updateJournalAmounts(
	prismaTrans: Prisma.TransactionClient,
	primaryJournalIds: string[]
) {
	const journals = await prismaTrans.journalEntry.findMany({
		where: { id: { in: primaryJournalIds } },
		include: { journalEntries: true }
	});

	//Make sure that the total amount of each modified transaction sums to zero.
	return Promise.all(
		journals.map((journal) => {
			const targetAmount =
				journal.journalEntries.reduce((prev, current) => prev + current.amount, 0) - journal.amount;

			return prismaTrans.journalEntry.update({
				where: { id: journal.id },
				data: { amount: -1.0 * targetAmount }
			});
		})
	);
}
