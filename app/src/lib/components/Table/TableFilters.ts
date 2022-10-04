import type { TableFilterTypes } from './TableTypes';

export type TableFilterFunction = (prefix: string) => TableFilterTypes[];

export const statusFilter: TableFilterFunction = (prefix) => [
	{
		filterType: 'options',
		key: `${prefix}.in`,
		title: 'Status',
		options: [
			{ title: 'Active', value: 'Active' },
			{ title: 'Disabled', value: 'Disabled' },
			{ title: 'Deleted', value: 'Deleted' }
		]
	}
];

export const accountTypeFilter: TableFilterFunction = (prefix) => [
	{
		filterType: 'options',
		key: `${prefix}.in`,
		title: 'Type',
		options: [
			{ title: 'Asset', value: 'Asset' },
			{ title: 'Liability', value: 'Liability' },
			{ title: 'Income', value: 'Income' },
			{ title: 'Expense', value: 'Expense' }
		]
	}
];

export const accountGroupFilter: TableFilterFunction = (prefix) => [
	{
		filterType: 'text',
		key: `${prefix}accountTitleCombined.contains`,
		title: 'Account Title Combined'
	},

	{
		filterType: 'text',
		key: `${prefix}accountGroup.contains`,
		title: 'Account Group'
	},

	{
		filterType: 'text',
		key: `${prefix}accountGroup2.contains`,
		title: 'Account Group 2'
	},

	{
		filterType: 'text',
		key: `${prefix}accountGroup3.contains`,
		title: 'Account Group 3'
	}
];

export const accountGroupingFilter: TableFilterFunction = (prefix) => [
	{
		filterType: 'text',
		key: `${prefix}title.contains`,
		title: 'Account Grouping Title'
	}
];

export const titleFilter: TableFilterFunction = (prefix) => [
	{ filterType: 'text', key: `${prefix}.contains`, title: 'Title' }
];
