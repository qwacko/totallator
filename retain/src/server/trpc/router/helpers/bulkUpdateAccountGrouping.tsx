import type { Prisma, PrismaClient, User } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import {
	type BulkUpgradeAccountGroupingValidationType,
	bulkUpdateAccountGroupingValidation
} from 'src/utils/validation/accountGrouping/bulkUpgradeAccountGroupingValidation';
import { type createSimpleTransactionValidationType } from 'src/utils/validation/journalEntries/createJournalValidation';

import { upsertAccounts } from './accounts/upsertAccounts';
import { upsertBills } from './bills/upsertBills';
import { upsertBudgets } from './budgets/upsertBudgets';
import { upsertCategories } from './categories/upsertCategories';
import { createSimpleTranasction } from './journals/createSimpleTranasction';
import { createTransaction } from './journals/createTransaction';
import { upsertJournals } from './journals/upsertJournals';
import { upsertTags } from './tags/upsertTags';
import type { UpsertReturnType } from './types';

const findData = <T extends Record<string, unknown>>(
	data: UpsertReturnType<T>,
	search: string | undefined
) => {
	if (!search) {
		return undefined;
	}
	if (search in data.idLookup && data.idLookup[search]) {
		return data.idLookup[search];
	}
	if (search in data.nameLookup && data.nameLookup[search]) {
		return data.nameLookup[search];
	}

	throw new TRPCError({
		message: 'Cannot find item. ID = ${searc}',
		code: 'PARSE_ERROR'
	});
};

export const bulkUpdateAccountGrouping = async ({
	prisma,
	input,
	user
}: {
	prisma: PrismaClient | Prisma.TransactionClient;
	input: BulkUpgradeAccountGroupingValidationType;
	user: User;
}) => {
	const data = bulkUpdateAccountGroupingValidation.parse(input);
	const userId = user.id;
	const userIsAdmin = user.admin;

	const accountInfo = await upsertAccounts({
		prisma,
		data,
		userId,
		userIsAdmin
	});

	const categoryInfo = await upsertCategories({
		prisma,
		data,
		userId,
		userIsAdmin
	});

	const billInfo = await upsertBills({
		prisma,
		data,
		userId,
		userIsAdmin
	});

	const budgetInfo = await upsertBudgets({
		prisma,
		data,
		userId,
		userIsAdmin
	});

	const tagInfo = await upsertTags({
		prisma,
		data,
		userId,
		userIsAdmin
	});

	//Upsert Transactions
	if (data.upsertJournalEntries && data.upsertJournalEntries.length > 0) {
		await upsertJournals({
			prisma,
			data: data.upsertJournalEntries,
			accountInfo,
			billInfo,
			budgetInfo,
			categoryInfo,
			tagInfo,
			accountGroupingId: data.accountGroupingId,
			user
		});
	}

	//Create Simple Transactions
	if (data.createSimpleTransactions && data.createSimpleTransactions.length > 0) {
		const simpleTransactionsForCreation: createSimpleTransactionValidationType[] =
			data.createSimpleTransactions.map((item) => {
				const bill = findData(billInfo, item.billId);
				const budget = findData(budgetInfo, item.budgetId);
				const category = findData(categoryInfo, item.categoryId);
				const tag = findData(tagInfo, item.tagId);
				const fromAccount = findData(accountInfo, item.fromAccountId);
				const toAccount = findData(accountInfo, item.toAccountId);

				if (!fromAccount) {
					throw new TRPCError({
						message: `From Account Not Found. id = ${item.fromAccountId}`,
						code: 'INTERNAL_SERVER_ERROR'
					});
				}

				if (!toAccount) {
					throw new TRPCError({
						message: `To Account Not Found. id = ${item.toAccountId}`,
						code: 'INTERNAL_SERVER_ERROR'
					});
				}

				return {
					...item,
					billId: bill ? bill.id : undefined,
					budgetId: budget ? budget.id : undefined,
					categoryId: category ? category.id : undefined,
					tagId: tag ? tag.id : undefined,
					accountGroupingId: data.accountGroupingId,
					fromAccountId: fromAccount.id,
					toAccountId: toAccount.id
				};
			});

		await Promise.all(
			simpleTransactionsForCreation.map(async (trans) => {
				// console.log("Creating Simple Transaction", index);
				await createSimpleTranasction({ user, prisma, input: trans });
				// console.log("Simple Transaction Creation Complete", index);
			})
		);
	}

	//Create Non-Simple Transactions
	if (data.createTransactions && data.createTransactions.length > 0) {
		const transactionsToCreate = data.createTransactions.map((trans) => {
			const journalsToCreate = trans.map((item) => {
				const bill = findData(billInfo, item.billId);
				const budget = findData(budgetInfo, item.budgetId);
				const category = findData(categoryInfo, item.categoryId);
				const tag = findData(tagInfo, item.tagId);
				const account = findData(accountInfo, item.accountId);

				if (!account) {
					throw new TRPCError({
						message: `Account ID ${item.accountId} not found`,
						code: 'INTERNAL_SERVER_ERROR'
					});
				}

				return {
					...item,
					billId: bill ? bill.id : undefined,
					budgetId: budget ? budget.id : undefined,
					categoryId: category ? category.id : undefined,
					tagId: tag ? tag.id : undefined,
					accountGroupingId: data.accountGroupingId,
					accountId: account.id
				};
			});

			return journalsToCreate;
		});
		await Promise.all(
			transactionsToCreate.map(async (transaction) =>
				createTransaction({ prisma, input: transaction, user })
			)
		);
	}
};
