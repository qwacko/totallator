import type { GetJournalsQuery } from '$lib/graphqlClient/generated';

export const addTotalsToJournals = (data: GetJournalsQuery['journalEntries']) => {
	if (!data?.journalEntries) {
		return undefined;
	}
	const sum = data.sum;

	return data.journalEntries.map((journal, journalIndex) => ({
		...journal,
		total: data.journalEntries
			.filter((item, sumIndex) => sumIndex >= journalIndex)
			.map((item) => item.amount)
			.reduce((prev, current) => prev + current, sum)
	}));
};

export type addTotalsToJournalsType = ReturnType<typeof addTotalsToJournals>;
