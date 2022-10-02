import { GraphQLYogaError } from '@graphql-yoga/common';
import type { JournalEntry, Prisma, PrismaClient } from '@prisma/client';
import { omit } from 'lodash-es';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import { createLinkedItems } from '../createLinkedItems';
import {
	CreateJournalInputValidation,
	type CreateJournalInputValidationType
} from './CreateJournalInputValidation';
import { checkLinkedItems } from './checkLinkedItems';
import { journalFilterBuilder } from './journalFilterBuilder';

export const CreateJournalEntry = async ({
	isPrimary = false,
	primaryId,
	primaryInfo,
	journalInfo,
	client,
	userId,
	admin
}: {
	isPrimary?: boolean;
	primaryId?: string;
	primaryInfo?: JournalEntry;
	journalInfo: CreateJournalInputValidationType;
	client: PrismaClient | Prisma.TransactionClient;
	userId: string;
	admin: boolean;
}) => {
	let primaryJournal: JournalEntry | undefined | null;
	let primaryJournalIdUse: string | undefined;

	if (!isPrimary) {
		if (primaryInfo) {
			primaryJournal = primaryInfo;
			primaryJournalIdUse = primaryInfo.id;
		} else if (primaryId) {
			primaryJournalIdUse = primaryId;
			const primaryJournals = await client.journalEntry.findMany({
				where: journalFilterBuilder({
					filter: { id: { equals: primaryId } },
					admin,
					userId,
					requireAdmin: true
				})
			});
			if (primaryJournals.length === 1) {
				primaryJournal = primaryJournals[0];
			} else {
				throw new GraphQLYogaError('Primary Journal not found');
			}
		} else {
			throw new GraphQLYogaError(
				"Cannot create a linked transaction without primary info. User shouldn't see this"
			);
		}
		if (primaryJournal === null || primaryJournal === undefined) {
			throw new GraphQLYogaError('Primary Journal not found');
		}
	} else {
		primaryJournalIdUse = uuidv4();
	}

	const hasPrimary = !!primaryJournal;
	const linked = hasPrimary && primaryJournal && primaryJournal.linked;
	const { account, tag, bill, budget, category, ...validatedJournalInfo } =
		CreateJournalInputValidation.parse(journalInfo);
	const createFromPrimary = omit(primaryJournal, ['id', 'updatedAt', 'createdAt']);

	const usedJournalInfoWithoutId = linked
		? {
				...createFromPrimary,
				accountId: journalInfo.accountId,
				amount: journalInfo.amount
		  }
		: { ...validatedJournalInfo, primaryJournalId: primaryJournalIdUse };

	const usedJournalInfo = isPrimary
		? { id: primaryJournalIdUse, ...usedJournalInfoWithoutId }
		: usedJournalInfoWithoutId;

	const itemCreation = linked
		? { account: journalInfo.account?.connectOrCreate }
		: {
				account: account?.connectOrCreate,
				tag: tag?.connectOrCreate,
				bill: bill?.connectOrCreate,
				budget: budget?.connectOrCreate,
				category: category?.connectOrCreate
		  };

	const createdItems = await createLinkedItems({
		userId,
		admin,
		client,
		...itemCreation
	});

	const journalEntryCreationFinalValidaton = z.object({
		id: z.string().uuid().optional(),
		date: z.date(),
		accountId: z.string().uuid(),
		description: z.string(),
		billId: z.string().uuid().optional().nullable(),
		budgetId: z.string().uuid().optional().nullable(),
		tagId: z.string().uuid().optional().nullable(),
		categoryId: z.string().uuid().optional().nullable(),
		primaryJournalId: z.string().uuid(),
		linked: z.boolean(),
		reconciled: z.boolean(),
		dataChecked: z.boolean(),
		amount: z.number(),
		accountGroupingId: z.string().uuid()
	});

	const finalNewJournalInfo: Prisma.JournalEntryCreateManyInput =
		journalEntryCreationFinalValidaton.parse({
			...usedJournalInfo,
			...createdItems
		});

	await checkLinkedItems({
		accountGroupingId: finalNewJournalInfo.accountGroupingId,
		accountIds: [finalNewJournalInfo.accountId],
		billIds: finalNewJournalInfo.billId ? [finalNewJournalInfo.billId] : undefined,
		budgetIds: finalNewJournalInfo.budgetId ? [finalNewJournalInfo.budgetId] : undefined,
		categoryIds: finalNewJournalInfo.categoryId ? [finalNewJournalInfo.categoryId] : undefined,
		tagIds: finalNewJournalInfo.tagId ? [finalNewJournalInfo.tagId] : undefined,
		client
	});

	return client.journalEntry.create({ data: finalNewJournalInfo });
};
