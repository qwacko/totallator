import { journalEntriesInclude } from '$lib/server/graphqlServer/types/models';
import { GraphQLYogaError } from '@graphql-yoga/common';
import type { Prisma } from '@prisma/client';
import { CreateJournalEntry } from './CreateJournalEntry';
import type { CreateJournalInputValidationType } from './CreateJournalInputValidation';

export async function createSingleTransaction(
	validatedInput: CreateJournalInputValidationType[],
	admin: boolean,
	userId: string,
	transClient: Prisma.TransactionClient
) {
	const [primaryJournal, ...otherJournals] = validatedInput;

	//Create The Primary Journal Entry
	const primaryJournalCreated = await CreateJournalEntry({
		isPrimary: true,
		admin,
		userId,
		client: transClient,
		journalInfo: primaryJournal
	});

	if (!primaryJournalCreated) {
		throw new GraphQLYogaError('Primary Journal Not Correctly Created');
	}

	const primaryJournalId = primaryJournalCreated.id;

	await Promise.all(
		otherJournals.map(async (currentJournal) =>
			CreateJournalEntry({
				isPrimary: false,
				admin,
				userId,
				client: transClient,
				primaryInfo: primaryJournalCreated,
				journalInfo: currentJournal
			})
		)
	);
	return transClient.journalEntry.findMany({
		where: { primaryJournalId: { equals: primaryJournalId } },
		include: journalEntriesInclude
	});
}
