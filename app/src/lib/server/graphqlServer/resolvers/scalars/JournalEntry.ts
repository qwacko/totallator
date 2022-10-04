import {
	type AccountModel,
	type BillModel,
	type BudgetModel,
	type CategoryModel,
	type JournalEntryModel,
	type TagModel,
	accountInclude,
	billInclude,
	budgetInclude,
	categoryInclude,
	journalEntriesInclude,
	tagInclude
} from '$lib/server/graphqlServer/types/models';
import type { GraphqlJournalEntry } from '$lib/server/graphqlServer/types/resolvers';
import prisma from '$lib/server/prisma/client';
import { GraphQLYogaError } from '@graphql-yoga/common';

import { userIsAdmin, userIsAdminFunction } from '../helpers/general/userIsAdmin';

export const JournalEntry: GraphqlJournalEntry = {
	primaryJournal: async (parent) => {
		const foundJournal = await prisma.journalEntry.findUnique({
			where: { id: parent.primaryJournalId },
			include: journalEntriesInclude
		});
		if (!foundJournal) {
			throw new GraphQLYogaError("Couldn't find primary journal");
		}
		return foundJournal;
	},
	account: async (parent): Promise<AccountModel> => {
		const foundAccount = await prisma.account.findUnique({
			where: { id: parent.accountId },
			include: accountInclude
		});
		if (!foundAccount) {
			throw new GraphQLYogaError("Account Couldn't Be Found");
		}
		return foundAccount;
	},
	journalEntries: async (parent): Promise<JournalEntryModel[]> => {
		const foundJournalEntries = await prisma.journalEntry.findMany({
			where: { primaryJournalId: parent.id },
			include: journalEntriesInclude
		});
		return foundJournalEntries;
	},
	primary: (parent): boolean => parent.id === parent.primaryJournalId,
	userIsAdmin,
	editable: async (parent, args, context, info): Promise<boolean> => {
		const userAdmin = userIsAdminFunction(parent, args, context, info);
		return !parent.complete && userAdmin;
	},
	amountEditable: async (parent, args, context, info): Promise<boolean> => {
		const userAdmin = userIsAdminFunction(parent, args, context, info);
		const isPrimary = parent.id === parent.primaryJournalId;
		return !parent.complete && userAdmin && !isPrimary;
	},
	total: () => 0,
	bill: async (parent): Promise<BillModel | undefined> => {
		if (!parent.billId) return undefined;
		const foundBill = await prisma.bill.findUnique({
			where: { id: parent.billId },
			include: billInclude
		});
		if (!foundBill) {
			throw new GraphQLYogaError("Bill Couldn't Be Found");
		}
		return foundBill;
	},
	budget: async (parent): Promise<BudgetModel | undefined> => {
		if (!parent.budgetId) return undefined;
		const foundBudget = await prisma.budget.findUnique({
			where: { id: parent.budgetId },
			include: budgetInclude
		});
		if (!foundBudget) {
			throw new GraphQLYogaError("Budget Couldn't Be Found");
		}
		return foundBudget;
	},
	category: async (parent): Promise<CategoryModel | undefined> => {
		if (!parent.categoryId) return undefined;
		const foundCategory = await prisma.category.findUnique({
			where: { id: parent.categoryId },
			include: categoryInclude
		});
		if (!foundCategory) {
			throw new GraphQLYogaError("Category Couldn't Be Found");
		}
		return foundCategory;
	},
	tag: async (parent): Promise<TagModel | undefined> => {
		if (!parent.tagId) return undefined;
		const foundTag = await prisma.tag.findUnique({
			where: { id: parent.tagId },
			include: tagInclude
		});
		if (!foundTag) {
			throw new GraphQLYogaError("Tag Couldn't Be Found");
		}
		return foundTag;
	}
};
