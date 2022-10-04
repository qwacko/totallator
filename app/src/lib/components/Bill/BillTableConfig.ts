import { updateBillDataUrql } from '$lib/graphqlClient/frontendHelpers/bills/updateBillData';
import type { GetBillsQuery, StatusEnum } from '$lib/graphqlClient/generated';
import type { Client } from '@urql/svelte';

import { accountGroupingFilter, statusFilter, titleFilter } from '../Table/TableFilters';
import type { TableColumnConfig } from '../Table/TableTypes';

export const BillTableColumnConfig = (
	client: Client
): TableColumnConfig<NonNullable<GetBillsQuery['bills']>['bills'][0]>[] => [
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
			updateBillDataUrql({
				id: rowData.id,
				currentBill: rowData,
				value: { title: value },
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
		title: 'Status',
		filterType: statusFilter('status'),
		type: 'simpleSelect',
		clearable: false,
		options: [
			{ value: 'Active', label: 'Active' },
			{ value: 'Disabled', label: 'Disabled' },
			{ value: 'Deleted', label: 'Deleted' }
		],
		onUpdate: async ({ rowData, value, setOperationResult }) => {
			updateBillDataUrql({
				id: rowData.id,
				currentBill: rowData,
				value: { status: value as StatusEnum },
				client,
				setOperationResult
			});
		}
	}
];
