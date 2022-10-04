import type {
	Account,
	AccountGrouping,
	Bill,
	Budget,
	Category,
	JournalEntry,
	Prisma as PrismaType,
	Tag,
	User
} from '@prisma/client';

export const accountGroupingIncludeFlex: PrismaType.AccountGroupingInclude = {
	adminUsers: true
};

export const accountGroupingInclude = { adminUsers: true, viewUsers: true } as const;

export const journalEntriesIncludeFlex = {
	accountGrouping: { include: accountGroupingInclude }
};

export const journalEntriesInclude = {
	accountGrouping: { include: accountGroupingInclude }
} as const;

export const accountIncludeFlex: PrismaType.AccountInclude = {
	accountGrouping: { include: accountGroupingInclude }
} as const;

export const accountInclude = {
	accountGrouping: { include: accountGroupingInclude }
} as const;

export const billIncludeFlex: PrismaType.BillInclude = {
	accountGrouping: { include: accountGroupingInclude }
} as const;

export const billInclude = {
	accountGrouping: { include: accountGroupingInclude }
} as const;

export const budgetIncludeFlex: PrismaType.BudgetInclude = {
	accountGrouping: { include: accountGroupingInclude }
} as const;

export const budgetInclude = {
	accountGrouping: { include: accountGroupingInclude }
} as const;

export const categoryIncludeFlex: PrismaType.CategoryInclude = {
	accountGrouping: { include: accountGroupingInclude }
} as const;

export const categoryInclude = {
	accountGrouping: { include: accountGroupingInclude }
} as const;

export const tagIncludeFlex: PrismaType.TagInclude = {
	accountGrouping: { include: accountGroupingInclude }
} as const;

export const tagInclude = {
	accountGrouping: { include: accountGroupingInclude }
} as const;

export type AccountGroupingModel = AccountGrouping & {
	adminUsers: User[];
	viewUsers: User[];
};
export type JournalEntryModel = JournalEntry & {
	accountGrouping: AccountGroupingModel;
};

export type AccountModel = Account & {
	accountGrouping: AccountGroupingModel;
};

export type BillModel = Bill & {
	accountGrouping: AccountGroupingModel;
};

export type BudgetModel = Budget & {
	accountGrouping: AccountGroupingModel;
};
export type CategoryModel = Category & {
	accountGrouping: AccountGroupingModel;
};
export type TagModel = Tag & {
	accountGrouping: AccountGroupingModel;
};
