import type { TableFilterTypes } from '../Table/TableTypes';

export const statusFilter: TableFilterTypes[] = [
	{
		filterType: 'boolean',
		key: 'complete.equals',
		onTitle: 'Complete',
		offTitle: 'Not Complete'
	},
	{
		filterType: 'boolean',
		key: 'reconciled.equals',
		onTitle: 'Reconciled',
		offTitle: 'Unreconciled'
	},
	{
		filterType: 'boolean',
		key: 'dataChecked.equals',
		onTitle: 'Data Checked',
		offTitle: 'Data Unchecked'
	},
	{
		filterType: 'boolean',
		key: 'linked.equals',
		onTitle: 'Linked',
		offTitle: 'Unlinked'
	}
];
export const accountGroupingFilter: TableFilterTypes[] = [
	{ filterType: 'text', key: 'accountGrouping.title.contains', title: 'Account Grouping Title' }
];
export const dateFilter: TableFilterTypes[] = [
	{ filterType: 'date', key: 'date.gte', title: 'After' },
	{ filterType: 'date', key: 'date.lte', title: 'Before' }
];
export const accountFilter: TableFilterTypes[] = [
	{ filterType: 'text', key: 'account.title.contains', title: 'Account Title' },
	{
		filterType: 'text',
		key: 'account.accountTitleCombined.contains',
		title: 'Combined Account Title'
	},
	{
		filterType: 'boolean',
		key: 'account.isCash.equals',
		onTitle: 'Cash',
		offTitle: 'Not Cash'
	},
	{
		filterType: 'boolean',
		key: 'account.isNetWorth.equals',
		onTitle: 'Net Worth',
		offTitle: 'Not Net Worth'
	},
	{
		filterType: 'boolean',
		key: 'account.active.equals',
		onTitle: 'Active',
		offTitle: 'Inactive'
	},
	{
		filterType: 'boolean',
		key: 'account.disabled.equals',
		onTitle: 'Disabled',
		offTitle: 'Not Disabled'
	},
	{
		filterType: 'boolean',
		key: 'account.deleted.equals',
		onTitle: 'Deleted',
		offTitle: 'Not Deleted'
	},
	{
		filterType: 'options',
		key: 'account.type.in',
		options: [
			{ title: 'Asset', value: 'Asset' },
			{ title: 'Liability', value: 'Liability' },
			{ title: 'Income', value: 'Income' },
			{ title: 'Expense', value: 'Expense' }
		]
	}
];
export const otherAccountsFilter: TableFilterTypes[] = [
	{
		filterType: 'text',
		key: 'primaryJournal.journalEntries.some.account.title.contains',
		title: 'Account Title'
	}
];
export const descriptionFilter: TableFilterTypes[] = [
	{ filterType: 'text', key: 'description.contains', title: 'Filter' }
];
export const amountFilter: TableFilterTypes[] = [
	{ filterType: 'amount', key: 'amount.gte', title: 'Greater Than' },
	{ filterType: 'amount', key: 'amount.lte', title: 'Less Than' }
];
