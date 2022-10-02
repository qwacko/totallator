import { updateTagDataUrql } from '$lib/graphqlClient/frontendHelpers/tags/updateTagData';
import type { GetTagsQuery, StatusEnum } from '$lib/graphqlClient/generated';
import type { Client } from '@urql/svelte';

import { accountGroupingFilter, statusFilter } from '../Table/TableFilters';
import type { TableColumnConfig } from '../Table/TableTypes';

export const TagTableColumnConfig = (
	client: Client
): TableColumnConfig<NonNullable<GetTagsQuery['tags']>['tags'][0]>[] => [
	{
		id: 'ag',
		editable: () => false,
		sortable: true,
		title: 'Account Grouping',
		type: 'text',
		filterType: accountGroupingFilter('accountGrouping.'),
		align: 'left',
		value: (rowData) => rowData.accountGrouping?.title || ''
	},
	{
		id: 'group',
		editable: (rowData) => rowData.allowUpdate && rowData.userIsAdmin,
		sortable: true,
		title: 'Group',
		type: 'text',
		filterType: [{ title: 'Group', key: 'group.contains', filterType: 'text' }],
		align: 'left',
		value: (rowData) => rowData.group,
		onUpdate: async ({ rowData, value, setOperationResult }) => {
			updateTagDataUrql({
				id: rowData.id,
				currentTag: rowData,
				value: { group: value },
				client,
				setOperationResult
			});
		}
	},
	{
		id: 'single',
		editable: (rowData) => rowData.allowUpdate && rowData.userIsAdmin,
		sortable: true,
		title: 'Single',
		type: 'text',
		filterType: [{ title: 'Single', key: 'single.contains', filterType: 'text' }],
		align: 'left',
		value: (rowData) => rowData.single,
		onUpdate: async ({ rowData, value, setOperationResult }) => {
			updateTagDataUrql({
				id: rowData.id,
				currentTag: rowData,
				value: { single: value },
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
			updateTagDataUrql({
				id: rowData.id,
				currentTag: rowData,
				value: { status: value as StatusEnum },
				client,
				setOperationResult
			});
		}
	}
];
