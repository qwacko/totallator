import type { InputMaybe } from '$lib/graphqlClient/generated';
import { authCheckPrisma } from '$lib/server/auth/authCheck';
import type {
	CreateJournalInput,
	JournalEntryFilter
} from '$lib/server/graphqlServer/types/generated-resolvers';
import {
	type JournalEntryModel,
	journalEntriesInclude
} from '$lib/server/graphqlServer/types/models';
import type { GraphqlMutationResolvers } from '$lib/server/graphqlServer/types/resolvers';
import prisma from '$lib/server/prisma/client';
import { GraphQLYogaError } from '@graphql-yoga/common';
import type { Prisma } from '@prisma/client';
import { z } from 'zod';

import { generateAccountSummary } from '../helpers/accounts/generateAccountSummary';
import { basicStatusToDBRequired } from '../helpers/general/basicStatusToDB';
import { CreateJournalEntry } from '../helpers/journalEntries/CreateJournalEntry';
import { CreateJournalInputArrayValidation } from '../helpers/journalEntries/CreateJournalInputValidation';
import { UpdateJournalInputValidation } from '../helpers/journalEntries/UpdateJournalInputValidation';
import { checkLinkedItems } from '../helpers/journalEntries/checkLinkedItems';
import { checkValidatedUpdateJournalInput } from '../helpers/journalEntries/checkUpdateJournalValidatedInput';
import { journalFilterBuilder } from '../helpers/journalEntries/journalFilterBuilder';
import { updateJournalAmounts } from '../helpers/journalEntries/updateJournalAmounts';

export const createTransaction: GraphqlMutationResolvers['createTransaction'] = async (
	_,
	args,
	context
) => {
	const { userId, admin } = authCheckPrisma(context);

	const validatedInput = await CreateJournalInputArrayValidation({ admin, userId }).parseAsync(
		args.input
	);

	const [primaryJournal, ...otherJournals] = validatedInput;
	let primaryJournalId: string | undefined;

	await prisma.$transaction(async (transClient) => {
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

		primaryJournalId = primaryJournalCreated.id;

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
	});

	return prisma.journalEntry.findMany({
		where: { primaryJournalId: { equals: primaryJournalId } },
		include: journalEntriesInclude
	});
};

export const updateJournalEntries: GraphqlMutationResolvers['updateJournalEntries'] = async (
	_,
	args,
	context
) => {
	const { userId, admin } = authCheckPrisma(context);

	const validatedInputAll = checkValidatedUpdateJournalInput(
		UpdateJournalInputValidation.parse(args.input)
	);

	const { amount, accountId, otherAccountId, ...validatedInput } = validatedInputAll;
	delete validatedInputAll['otherAccountId'];

	const targetedTransactions = await prisma.journalEntry.findMany({
		where: {
			AND: [
				journalFilterBuilder({ admin, userId, filter: args.filter, requireAdmin: true }),
				{ complete: { not: true } }
			]
		},
		select: {
			id: true,
			primaryJournalId: true,
			accountGroupingId: true,
			linked: true,
			primaryJournal: { select: { journalEntries: { select: { id: true } } } }
		}
	});

	const targetedLinkedTransactions = targetedTransactions.filter((item) => item.linked);
	const targetedUnlinkedJournals = targetedTransactions.filter((item) => !item.linked);
	const transactionsWithThreeJournals = targetedTransactions.filter(
		(item) => item.primaryJournal.journalEntries.length > 2
	);
	const otherJournalIdsGrouped = targetedTransactions.map((item) =>
		item.primaryJournal.journalEntries
			.map((journal) => journal.id)
			.filter((journal) => journal !== item.id)
	);
	const otherJournalIds = otherJournalIdsGrouped.reduce(
		(prev, current) => [...prev, ...current],
		[]
	);

	if (targetedLinkedTransactions.length === 0 && targetedUnlinkedJournals.length === 0) {
		throw new GraphQLYogaError('No Matching Journal Entries Found');
	}

	if (transactionsWithThreeJournals.length > 0 && otherAccountId) {
		throw new GraphQLYogaError(
			'Cannot update other account for transaction with more than two journals'
		);
	}

	const updatingLinkedItems =
		accountId ||
		validatedInput.billId ||
		validatedInput.budgetId ||
		validatedInput.categoryId ||
		validatedInput.tagId;

	if (updatingLinkedItems) {
		//First Check All Transactions have the same account grouping
		const accountGroupingsIncluded = [
			...new Set([
				...targetedLinkedTransactions.map((item) => item.accountGroupingId),
				...targetedUnlinkedJournals.map((item) => item.accountGroupingId)
			])
		];
		if (accountGroupingsIncluded.length > 1) {
			throw new GraphQLYogaError(
				'If updating Account / Bill / Budget / Category or Tag Then All Selected Transactions Should have the same account grouping.'
			);
		}

		//Since only one account grouping is found then the target will be the first in the array
		const targetAccountGrouping = accountGroupingsIncluded[0];

		const accountIdsToCheck =
			accountId && otherAccountId
				? [accountId, otherAccountId]
				: accountId
				? [accountId]
				: otherAccountId
				? [otherAccountId]
				: undefined;

		await checkLinkedItems({
			accountGroupingId: targetAccountGrouping,
			accountIds: accountIdsToCheck,
			billIds: validatedInput.billId ? [validatedInput.billId] : undefined,
			budgetIds: validatedInput.budgetId ? [validatedInput.budgetId] : undefined,
			categoryIds: validatedInput.categoryId ? [validatedInput.categoryId] : undefined,
			tagIds: validatedInput.tagId ? [validatedInput.tagId] : undefined,
			client: prisma
		});
	}

	const primaryJournalIds = [
		...new Set([
			...targetedLinkedTransactions.map((item) => item.primaryJournalId),
			...targetedUnlinkedJournals.map((item) => item.primaryJournalId)
		])
	];

	// A single transaction handles all the data modifications to make sure all occur or nothing occurs.
	await prisma.$transaction(async (prismaTrans) => {
		//Update linked transactions
		if (Object.keys(validatedInput).length > 0) {
			await Promise.all(
				targetedLinkedTransactions.map((trans) =>
					prismaTrans.journalEntry.updateMany({
						where: { primaryJournalId: trans.primaryJournalId },
						data: validatedInput
					})
				)
			);
		}

		//Update Unlinked Transactions
		if (Object.keys(validatedInputAll).length > 0) {
			await Promise.all(
				targetedUnlinkedJournals.map((journal) =>
					prismaTrans.journalEntry.updateMany({
						where: { id: journal.id },
						data: validatedInputAll
					})
				)
			);
		}

		//Update Other Account Ids
		if (otherAccountId) {
			await prismaTrans.journalEntry.updateMany({
				where: { id: { in: otherJournalIds } },
				data: { accountId: otherAccountId }
			});
		}

		//If the amount or account id is being changed, then update the amount for linked transactions (cannot do this any other way)
		if (amount !== undefined || accountId) {
			await Promise.all(
				targetedLinkedTransactions.map((trans) =>
					prismaTrans.journalEntry.updateMany({
						where: { id: trans.id },
						data: { amount, accountId }
					})
				)
			);
		}

		//Get the updated journal information from the database
		await updateJournalAmounts(prismaTrans, primaryJournalIds);
	});

	return prisma.journalEntry.findMany({
		where: { primaryJournalId: { in: primaryJournalIds } },
		include: journalEntriesInclude
	});
};

export const unlinkTransactions: GraphqlMutationResolvers['unlinkTransactions'] = async (
	_,
	args,
	context
) => {
	const { userId, admin } = authCheckPrisma(context);

	const validatedInputAll = z.object({ primaryJournalIds: z.array(z.string().uuid()) }).parse(args);
	const filter: JournalEntryFilter = {
		primaryJournalId: { in: validatedInputAll.primaryJournalIds },
		complete: { equals: false }
	};

	await prisma.journalEntry.updateMany({
		where: journalFilterBuilder({ filter, userId, admin, requireAdmin: true }),
		data: { linked: false }
	});

	return prisma.journalEntry.findMany({
		where: journalFilterBuilder({ filter, userId, admin, requireAdmin: true }),
		include: journalEntriesInclude
	});
};

export const linkTransactions: GraphqlMutationResolvers['linkTransactions'] = async (
	_,
	args,
	context
) => {
	const { userId, admin } = authCheckPrisma(context);

	const validatedInputAll = z.object({ primaryJournalIds: z.array(z.string().uuid()) }).parse(args);
	const filter: JournalEntryFilter = {
		id: { in: validatedInputAll.primaryJournalIds },
		complete: { equals: false }
	};

	//First Get the primar journal information
	const targetJournals = await prisma.journalEntry.findMany({
		where: journalFilterBuilder({ filter, userId, admin, requireAdmin: true })
	});

	//Update All Transaction
	await prisma.$transaction(
		async (prismaTrans) =>
			await Promise.all(
				targetJournals.map(async (journal) => {
					const thisFilter: JournalEntryFilter = {
						primaryJournalId: { equals: journal.id }
					};

					return prismaTrans.journalEntry.updateMany({
						where: journalFilterBuilder({ filter: thisFilter, userId, admin, requireAdmin: true }),
						data: {
							date: journal.date,
							linked: true,
							description: journal.description,
							complete: journal.complete,
							dataChecked: journal.dataChecked,
							reconciled: journal.reconciled
						}
					});
				})
			)
	);

	//Return the updated Journals
	return prisma.journalEntry.findMany({
		where: journalFilterBuilder({ filter, userId, admin, requireAdmin: true }),
		include: journalEntriesInclude
	});
};

export const deleteJournalEntries: GraphqlMutationResolvers['deleteJournalEntries'] = async (
	_,
	args,
	context
) => {
	const { userId, admin } = authCheckPrisma(context);

	const validatedInputAll = z.object({ journalIds: z.array(z.string().uuid()) }).parse(args);
	const filter: JournalEntryFilter = {
		id: { in: validatedInputAll.journalIds },
		complete: { equals: false }
	};

	//Get Information About the number of journal entries on the transaction
	const journalInfo = await prisma.journalEntry.findMany({
		where: journalFilterBuilder({ filter, userId, admin, requireAdmin: true }),
		include: { primaryJournal: { include: { journalEntries: true } } }
	});

	const primaryJournalIds = journalInfo.map((journal) => journal.primaryJournalId);
	const primaryJournalInfo = journalInfo
		.map((journal) => ({
			id: journal.id,
			primaryId: journal.primaryJournalId,
			count: journal.primaryJournal.journalEntries.length,
			numberToRemove: primaryJournalIds.filter((item) => item === journal.primaryJournalId).length,
			isPrimary: journal.id === journal.primaryJournalId
		}))
		.map((item) => ({ ...item, remainingCount: item.count - item.numberToRemove }));

	const numberWithTooFew = primaryJournalInfo.filter((item) => item.remainingCount == 1);
	const numberWithPrimaryDeleted = primaryJournalInfo.filter(
		(item) => item.isPrimary && item.remainingCount > 0
	);

	if (numberWithTooFew.length > 0) {
		throw new GraphQLYogaError(
			`Cannot Delete Journals And Leave Only One for a transaction. The Following Journals are affected ${JSON.stringify(
				numberWithTooFew.map((item) => item.id)
			)}`
		);
	}

	if (numberWithPrimaryDeleted.length > 0) {
		throw new GraphQLYogaError(
			`Cannot delete the primary journal. The Following Journals are affected ${JSON.stringify(
				numberWithPrimaryDeleted.map((item) => item.id)
			)}`
		);
	}

	const primaryFilter: JournalEntryFilter = { primaryJournalId: { in: primaryJournalIds } };

	//Update all the transactions, and also update the primary journal amount to make the transaction complete
	return prisma.$transaction(async (prismaClient) => {
		await prismaClient.journalEntry.deleteMany({
			where: journalFilterBuilder({ filter, userId, admin, requireAdmin: true })
		});
		await updateJournalAmounts(prismaClient, [...new Set(primaryJournalIds)]);

		return prismaClient.journalEntry.findMany({
			where: journalFilterBuilder({ filter: primaryFilter, userId, admin, requireAdmin: true }),
			include: journalEntriesInclude
		});
	});
};

//LATER Make adding journals to existing transactions also add tag / bill / budget / category etc...
//(And make sure to check accountGrouping). At this time don't use this function so unnecessary
export const addJournalEntries: GraphqlMutationResolvers['addJournalEntries'] = async (
	_,
	args,
	context
) => {
	const { userId, admin } = authCheckPrisma(context);

	const validatedArgs = z
		.object({
			data: z.array(
				z.object({
					date: z.date().optional(),
					description: z.string().optional(),
					amount: z.number().default(0),
					reconciled: z.boolean().optional(),
					dataChecked: z.boolean().optional(),
					complete: z.boolean().optional(),
					accountId: z.string().uuid(),
					primaryJournalId: z.string().uuid()
				})
			)
		})
		.parse(args);

	const targetPrimaryIds = validatedArgs.data.map((item) => item.primaryJournalId);

	const primaryJournalInfo = await prisma.journalEntry.findMany({
		where: journalFilterBuilder({
			userId,
			admin,
			requireAdmin: true,
			filter: { id: { in: targetPrimaryIds }, complete: { equals: false } }
		})
	});

	const foundPrimaryIds = primaryJournalInfo.map((item) => item.id);
	const notFoundPrimaryIds = targetPrimaryIds.filter((item) => !foundPrimaryIds.includes(item));

	if (notFoundPrimaryIds.length > 0) {
		throw new GraphQLYogaError(
			"Some target primary Ids not found, are completed, or user doesn't have access"
		);
	}

	const journalsToAdd: Prisma.JournalEntryCreateInput[] = validatedArgs.data.map((journal) => {
		const existingPrimary = primaryJournalInfo.find((item) => item.id === journal.primaryJournalId);

		if (!existingPrimary) {
			throw new GraphQLYogaError('Unknown Error');
		}

		if (existingPrimary.linked) {
			return {
				date: existingPrimary.date,
				description: existingPrimary.description,
				amount: journal.amount,
				account: { connect: { id: journal.accountId } },
				primaryJournal: { connect: { id: existingPrimary.id } },
				complete: existingPrimary.complete,
				dataChecked: existingPrimary.dataChecked,
				reconciled: existingPrimary.reconciled,
				accountGrouping: { connect: { id: existingPrimary.accountGroupingId } }
			};
		}
		return {
			date: journal.date ? journal.date : existingPrimary.date,
			description: journal.description ? journal.description : existingPrimary.description,
			amount: journal.amount,
			complete: journal.complete === undefined ? existingPrimary.complete : journal.complete,
			dataChecked:
				journal.dataChecked === undefined ? existingPrimary.dataChecked : journal.dataChecked,
			reconciled:
				journal.reconciled === undefined ? existingPrimary.reconciled : journal.reconciled,
			account: { connect: { id: journal.accountId } },
			accountGrouping: { connect: { id: existingPrimary.accountGroupingId } },
			primaryJournal: { connect: { id: existingPrimary.id } }
		};
	});

	return prisma.$transaction(async (prismatrans) => {
		await Promise.all(
			journalsToAdd.map(async (journal) => {
				return prismatrans.journalEntry.create({ data: journal });
			})
		);

		await updateJournalAmounts(prismatrans, foundPrimaryIds);

		return prismatrans.journalEntry.findMany({
			where: journalFilterBuilder({
				filter: { primaryJournalId: { in: foundPrimaryIds } },
				admin,
				userId,
				requireAdmin: true
			}),
			include: journalEntriesInclude
		});
	});
};

export const changePrimaryJournal: GraphqlMutationResolvers['changePrimaryJournal'] = async (
	_,
	args,
	context
) => {
	const { userId, admin } = authCheckPrisma(context);

	const validatedArgs = z
		.object({ newPrimaryId: z.string().uuid(), oldPrimaryId: z.string().uuid() })
		.parse(args);

	if (validatedArgs.newPrimaryId === validatedArgs.oldPrimaryId) {
		throw new GraphQLYogaError('Journal IDs Must Not Match');
	}

	const filter: InputMaybe<JournalEntryFilter> = {
		id: { equals: validatedArgs.newPrimaryId },
		primaryJournalId: { equals: validatedArgs.oldPrimaryId },
		complete: { equals: false }
	};

	const targetJournal = await prisma.journalEntry.findMany({
		where: journalFilterBuilder({
			filter,
			admin,
			userId,
			requireAdmin: true
		})
	});

	if (!targetJournal) {
		throw new GraphQLYogaError('Matching Journal Not Found, complete or not accessible to user');
	}

	await prisma.journalEntry.updateMany({
		where: journalFilterBuilder({
			filter: { primaryJournalId: { equals: validatedArgs.oldPrimaryId } },
			admin,
			userId,
			requireAdmin: true
		}),
		data: { primaryJournalId: validatedArgs.newPrimaryId }
	});

	return prisma.journalEntry.findMany({
		where: journalFilterBuilder({
			filter: { primaryJournalId: { equals: validatedArgs.newPrimaryId } },
			admin,
			userId,
			requireAdmin: true
		}),
		include: journalEntriesInclude
	});
};

export const cloneTransactions: GraphqlMutationResolvers['cloneTransactions'] = async (
	_,
	args,
	context,
	info
) => {
	const { userId, admin } = authCheckPrisma(context);

	const validatedArgs = z
		.object({ ids: z.array(z.string().uuid()), input: UpdateJournalInputValidation.optional() })
		.parse(args);
	const filteredTarget = [...new Set(validatedArgs.ids)];

	if (validatedArgs.input?.accountId || typeof validatedArgs.input?.amount === 'number') {
		throw new GraphQLYogaError('Cannot Clone And Update The Account Id or amount');
	}

	const targetTransactions = await prisma.journalEntry.findMany({
		where: journalFilterBuilder({
			filter: { id: { in: filteredTarget } },
			admin,
			userId,
			requireAdmin: true
		}),
		include: { journalEntries: true }
	});

	if (targetTransactions.length < filteredTarget.length) {
		throw new GraphQLYogaError('Not All Transactions Exist or Are Accessible To User');
	}

	const input: CreateJournalInput[][] = targetTransactions.map((transaction) => {
		const primaryJournalId = transaction.id;
		const otherJournals = transaction.journalEntries.filter((item) => item.id !== primaryJournalId);

		return [
			{
				accountGroupingId: transaction.accountGroupingId,
				accountId: transaction.accountId,
				amount: transaction.amount,
				complete: false,
				dataChecked: false,
				reconciled: false,
				date: transaction.date,
				description: transaction.description,
				linked: transaction.linked,
				billId: transaction.billId || undefined,
				budgetId: transaction.budgetId || undefined,
				categoryId: transaction.categoryId || undefined,
				tagId: transaction.tagId || undefined,
				...validatedArgs.input
			},
			...otherJournals.map((journal) => ({
				accountGroupingId: journal.accountGroupingId,
				accountId: journal.accountId,
				amount: journal.amount,
				complete: false,
				dataChecked: false,
				reconciled: false,
				date: journal.date,
				description: journal.description,
				linked: journal.linked,
				billId: journal.billId || undefined,
				budgetId: journal.budgetId || undefined,
				categoryId: journal.categoryId || undefined,
				tagId: journal.tagId || undefined,
				...validatedArgs.input
			}))
		];
	});

	const addedJournals = (await Promise.all(
		input.map(async (currentTrans) => createTransaction({}, { input: currentTrans }, context, info))
	)) as JournalEntryModel[][];

	const flattenedJournals = addedJournals.reduce((prev, current) => [...prev, ...current], []);

	return flattenedJournals;
};

export const transactionsToIncomplete: GraphqlMutationResolvers['transactionsToIncomplete'] =
	async (_, args, context) => {
		const { userId, admin } = authCheckPrisma(context);

		const validatedInputAll = z
			.object({ primaryJournalIds: z.array(z.string().uuid()) })
			.parse(args);
		const filter: JournalEntryFilter = {
			primaryJournalId: { in: validatedInputAll.primaryJournalIds },
			complete: { equals: true }
		};

		const finalFilter: JournalEntryFilter = {
			primaryJournalId: { in: validatedInputAll.primaryJournalIds }
		};

		await prisma.journalEntry.updateMany({
			where: journalFilterBuilder({ filter, userId, admin, requireAdmin: true }),
			data: { complete: false }
		});

		return prisma.journalEntry.findMany({
			where: journalFilterBuilder({ filter: finalFilter, userId, admin, requireAdmin: true }),
			include: journalEntriesInclude
		});
	};

export const transactionsToComplete: GraphqlMutationResolvers['transactionsToComplete'] = async (
	_,
	args,
	context
) => {
	const { userId, admin } = authCheckPrisma(context);

	const validatedInputAll = z.object({ primaryJournalIds: z.array(z.string().uuid()) }).parse(args);
	const filter: JournalEntryFilter = {
		primaryJournalId: { in: validatedInputAll.primaryJournalIds },
		complete: { equals: false }
	};

	const finalFilter: JournalEntryFilter = {
		primaryJournalId: { in: validatedInputAll.primaryJournalIds }
	};

	await prisma.journalEntry.updateMany({
		where: journalFilterBuilder({ filter, userId, admin, requireAdmin: true }),
		data: { complete: true, reconciled: true, dataChecked: true }
	});

	return prisma.journalEntry.findMany({
		where: journalFilterBuilder({ filter: finalFilter, userId, admin, requireAdmin: true }),
		include: journalEntriesInclude
	});
};

export const addExpenseAndConnectToJournals: GraphqlMutationResolvers['addExpenseAndConnectToJournals'] =
	async (_, args, context) => {
		const { userId, admin } = authCheckPrisma(context);

		const validatedInputAll = z
			.object({ journalIds: z.array(z.string().uuid()), expenseName: z.string() })
			.parse(args);

		const filter = journalFilterBuilder({
			filter: { id: { in: validatedInputAll.journalIds } },
			admin,
			userId,
			requireAdmin: true
		});

		//Check Account Groupings For Journals
		const targetJournals = await prisma.journalEntry.findMany({
			where: filter
		});

		if (targetJournals.length === 0) {
			throw new GraphQLYogaError('No Matching Journals Found');
		}

		const accountGroupingList = [...new Set(targetJournals.map((item) => item.accountGroupingId))];

		if (accountGroupingList.length !== 1) {
			throw new GraphQLYogaError('Not All Journal Account Groupings Match');
		}

		return prisma.$transaction(async (prismaTrans) => {
			//Create the new expense account
			const newAccount = await prismaTrans.account.create({
				data: {
					accountGroupingId: accountGroupingList[0],
					title: validatedInputAll.expenseName,
					type: 'Expense',
					...generateAccountSummary({
						title: validatedInputAll.expenseName,
						accountGroup: undefined,
						accountGroup2: undefined,
						accountGroup3: undefined
					}),
					...basicStatusToDBRequired('Active')
				}
			});

			//Connect the selected journals to the new expense account
			await prismaTrans.journalEntry.updateMany({
				where: filter,
				data: { accountId: newAccount.id }
			});

			//Return the updated Journal Entries
			return prismaTrans.journalEntry.findMany({ where: filter, include: journalEntriesInclude });
		});
	};
