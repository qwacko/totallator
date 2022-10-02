import { updateAccountDataUrql } from '$lib/graphqlClient/frontendHelpers/updateAccountData';
import type { AccountType, GetAccountsQuery, StatusEnum } from '$lib/graphqlClient/generated';
import type { Client } from '@urql/svelte';

import {
	accountGroupFilter,
	accountGroupingFilter,
	accountTypeFilter,
	statusFilter,
	titleFilter
} from '../Table/TableFilters';
import type { TableColumnConfig } from '../Table/TableTypes';
import toastsStore from '../Toasts/toastsStore';

export const AccountTableColumnConfig = (
	client: Client
): TableColumnConfig<GetAccountsQuery['accounts']['accounts'][0]>[] => [
	{
		id: 'ag',
		editable: () => false,
		sortable: true,
		filterType: accountGroupingFilter('accountGrouping.'),
		title: 'Account Grouping',
		type: 'text',
		align: 'left',
		value: (rowData) => rowData.accountGrouping?.title || ''
	},
	{
		id: 'title',
		editable: (rowData) => rowData.allowUpdate && rowData.userIsAdmin,
		sortable: true,
		filterType: titleFilter('title'),
		title: 'Title',
		type: 'text',
		align: 'left',
		value: (rowData) => rowData.title,
		onUpdate: async ({ rowData, value, setOperationResult }) => {
			updateAccountDataUrql({
				id: rowData.id,
				currentAccount: rowData,
				value: { title: value },
				client,
				setOperationResult
			});
		}
	},
	{
		id: 'type',
		editable: (rowData) => rowData.allowUpdate && rowData.userIsAdmin,
		value: (rowData) => rowData.type,
		sortable: true,
		title: 'Type',
		type: 'simpleSelect',
		filterType: accountTypeFilter('type'),
		clearable: false,
		options: [
			{ value: 'Income', label: 'Income' },
			{ value: 'Expense', label: 'Expense' },
			{ value: 'Asset', label: 'Asset' },
			{ value: 'Liability', label: 'Liability' }
		],
		onUpdate: async ({ rowData, value, setOperationResult }) => {
			updateAccountDataUrql({
				id: rowData.id,
				currentAccount: rowData,
				value: { type: value as AccountType },
				client,
				setOperationResult
			});
		}
	},
	{
		id: 'status',
		editable: (rowData) => rowData.userIsAdmin,
		value: (rowData) => rowData.status,
		sortable: true,
		filterType: statusFilter('status'),
		title: 'Status',
		type: 'simpleSelect',
		clearable: false,
		options: [
			{ value: 'Active', label: 'Active' },
			{ value: 'Disabled', label: 'Disabled' },
			{ value: 'Deleted', label: 'Deleted' }
		],
		onUpdate: async ({ rowData, value, setOperationResult }) => {
			updateAccountDataUrql({
				id: rowData.id,
				currentAccount: rowData,
				value: { status: value as StatusEnum },
				client,
				setOperationResult
			});
		}
	},
	{
		id: 'accountGroupCombined',
		editable: (rowData) =>
			rowData.allowUpdate &&
			rowData.userIsAdmin &&
			(rowData.type === 'Asset' || rowData.type === 'Liability'),
		sortable: true,
		title: 'Account Group (Combined)',
		filterType: accountGroupFilter(''),
		type: 'text',
		clearable: true,
		value: (rowData) => rowData.accountGroupCombined || '',
		onUpdate: async ({ rowData, value, setOperationResult }) => {
			const accountGroups = (value || '').replace('\\', '/').split('/');
			if (accountGroups.length > 3) {
				toastsStore.addToast({
					duration: 2000,
					style: 'outline',
					type: 'warning',
					title: 'Account Group Error',
					description: 'Account Group must have no more than two slashes'
				});
			} else {
				const accountGroup = accountGroups[0] || null;
				const accountGroup2 = accountGroups[1] || null;
				const accountGroup3 = accountGroups[2] || null;
				updateAccountDataUrql({
					id: rowData.id,
					currentAccount: rowData,
					value: { accountGroup, accountGroup2, accountGroup3 },
					client,
					setOperationResult
				});
			}
		}
	},
	{
		id: 'isCash',
		editable: (rowData) =>
			rowData.allowUpdate &&
			rowData.userIsAdmin &&
			(rowData.type === 'Asset' || rowData.type === 'Liability'),
		sortable: true,
		title: 'Cash',
		filterType: [{ filterType: 'boolean', title: 'Is Cash', key: 'isCash.equals' }],
		type: 'boolean',
		value: (rowData) => rowData.isCash,
		onUpdate: async ({ rowData, value, setOperationResult }) => {
			updateAccountDataUrql({
				id: rowData.id,
				currentAccount: rowData,
				value: { isCash: value },
				client,
				setOperationResult
			});
		}
	},
	{
		id: 'isNetWorth',
		editable: (rowData) =>
			rowData.allowUpdate &&
			rowData.userIsAdmin &&
			(rowData.type === 'Asset' || rowData.type === 'Liability'),
		sortable: true,
		title: 'Net Worth',
		filterType: [{ filterType: 'boolean', title: 'Net Worth', key: 'isNetWorth.equals' }],
		type: 'boolean',
		value: (rowData) => rowData.isNetWorth,
		onUpdate: async ({ rowData, value, setOperationResult }) => {
			updateAccountDataUrql({
				id: rowData.id,
				currentAccount: rowData,
				value: { isNetWorth: value },
				client,
				setOperationResult
			});
		}
	},
	{
		id: 'startDate',
		editable: (rowData) =>
			rowData.allowUpdate &&
			rowData.userIsAdmin &&
			(rowData.type === 'Asset' || rowData.type === 'Liability'),
		sortable: true,
		title: 'Start Date',
		type: 'date',
		filterType: [
			{ filterType: 'date', title: 'Before', key: 'startDate.lte' },
			{ filterType: 'date', title: 'After', key: 'startDate.gte' }
		],
		clearable: true,
		value: (rowData) => rowData.startDate,
		onUpdate: async ({ rowData, value, setOperationResult }) => {
			updateAccountDataUrql({
				id: rowData.id,
				currentAccount: rowData,
				value: { startDate: value },
				client,
				setOperationResult
			});
		}
	},
	{
		id: 'endDate',
		editable: (rowData) =>
			rowData.allowUpdate &&
			rowData.userIsAdmin &&
			(rowData.type === 'Asset' || rowData.type === 'Liability'),
		sortable: true,
		filterType: [
			{ filterType: 'date', title: 'Before', key: 'endDate.lte' },
			{ filterType: 'date', title: 'After', key: 'endDate.gte' }
		],
		title: 'End Date',
		type: 'date',
		clearable: true,
		value: (rowData) => rowData.endDate,
		onUpdate: async ({ rowData, value, setOperationResult }) => {
			updateAccountDataUrql({
				id: rowData.id,
				currentAccount: rowData,
				value: { endDate: value },
				client,
				setOperationResult
			});
		}
	}
];
