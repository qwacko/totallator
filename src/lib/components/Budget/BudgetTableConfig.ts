import { updateBudgetDataUrql } from '$lib/graphqlClient/frontendHelpers/budgets/updateBudgetData';
import type { GetBudgetsQuery, StatusEnum } from '$lib/graphqlClient/generated';
import type { Client } from '@urql/svelte';

import { accountGroupFilter, statusFilter, titleFilter } from '../Table/TableFilters';
import type { TableColumnConfig } from '../Table/TableTypes';

export const BudgetTableColumnConfig = (
	client: Client
): TableColumnConfig<NonNullable<GetBudgetsQuery['budgets']>['budgets'][0]>[] => [
	{
		id: 'ag',
		editable: () => false,
		sortable: true,
		title: 'Account Grouping',
		filterType: accountGroupFilter('accountGrouping.'),
		type: 'text',
		align: 'left',
		value: (rowData) => rowData.accountGrouping?.title || ''
	},
	{
		id: 'title',
		editable: (rowData) => rowData.allowUpdate && rowData.userIsAdmin,
		sortable: true,
		title: 'Title',
		filterType: titleFilter('title'),
		type: 'text',
		align: 'left',
		value: (rowData) => rowData.title,
		onUpdate: async ({ rowData, value, setOperationResult }) => {
			updateBudgetDataUrql({
				id: rowData.id,
				currentBudget: rowData,
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
		type: 'simpleSelect',
		filterType: statusFilter('status'),
		clearable: false,
		options: [
			{ value: 'Active', label: 'Active' },
			{ value: 'Disabled', label: 'Disabled' },
			{ value: 'Deleted', label: 'Deleted' }
		],
		onUpdate: async ({ rowData, value, setOperationResult }) => {
			updateBudgetDataUrql({
				id: rowData.id,
				currentBudget: rowData,
				value: { status: value as StatusEnum },
				client,
				setOperationResult
			});
		}
	}
];
