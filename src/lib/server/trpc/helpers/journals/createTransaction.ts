import type { Prisma, PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import type { createTransactionValidationType } from '$lib/validation/journalEntries/createJournalValidation';

import { checkAccountGroupingAccess } from '../accountGrouping/checkAccountGroupingAccess';
import { checkLinkedItems } from '../checkLinkedItems';
import type { UserInfo } from '$lib/server/trpc/helpers/getUserInfo';
import { journalDateArrayMoreData } from './journalDateMoreData';

export const createTransaction = async ({
	input,
	prisma,
	user
}: {
	input: createTransactionValidationType;
	prisma: PrismaClient | Prisma.TransactionClient;
	user: UserInfo;
}) => {
	const accountGroupingId = input[0] ? input[0].accountGroupingId : 'error';

	if (accountGroupingId === 'error') {
		throw new TRPCError({
			message: 'Account Grouping Error',
			code: 'INTERNAL_SERVER_ERROR'
		});
	}

	await checkAccountGroupingAccess({
		accountGroupingId,
		prisma,
		user,
		adminRequired: true
	});

	await checkLinkedItems({
		accountGroupingId,
		client: prisma,
		accountIds: input.map((item) => item.accountId),
		billIds: input.map((item) => item.billId),
		budgetIds: input.map((item) => item.budgetId),
		categoryIds: input.map((item) => item.categoryId),
		tagIds: input.map((item) => item.tagId)
	});

	await prisma.transaction.create({
		data: {
			journalEntries: { createMany: { data: journalDateArrayMoreData(input) } }
		}
	});
};
