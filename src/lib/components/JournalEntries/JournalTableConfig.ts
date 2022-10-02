// import { updateAccountDataUrql } from '$lib/graphqlClient/frontendHelpers/updateAccountData';
import { updateJournalEntryData } from '$lib/graphqlClient/frontendHelpers/updateJournalEntry';
import {
	updateTransactionComplete,
	updateTransactionIncomplete
} from '$lib/graphqlClient/frontendHelpers/updateJournalEntryComplete';
import {
	updateJournalEntryLink,
	updateJournalEntryUnlink
} from '$lib/graphqlClient/frontendHelpers/updateJournalEntryLinking';
import { updateJournalEntryNewExpense } from '$lib/graphqlClient/frontendHelpers/updateJournalEntryNewExpense';
import { updateJournalEntryPrimary } from '$lib/graphqlClient/frontendHelpers/updateJournalEntryPrimary';
import type { GetJournalsQuery } from '$lib/graphqlClient/generated';
import type { Client } from '@urql/svelte';
import { z } from 'zod';

import { statusFilter, titleFilter } from '../Table/TableFilters';
import type { TableColumnConfig } from '../Table/TableTypes';
import {
	accountFilter,
	accountGroupingFilter,
	amountFilter,
	dateFilter,
	descriptionFilter,
	statusFilter as journalStatusFilter,
	otherAccountsFilter
} from './JournalTableFilters';

export const JournalTableColumnConfig = (
	client: Client
): TableColumnConfig<NonNullable<GetJournalsQuery['journalEntries']>['journalEntries'][0]>[] => [
	{
		type: 'icons',
		id: 'icons',
		title: 'Status',
		editable: () => false,
		sortable: false,
		filterType: journalStatusFilter,
		value: (rowData) => ({
			complete: 'button',
			completeValue: rowData.complete,
			dataChecked: rowData.complete ? 'icon' : 'button',
			dataCheckedValue: rowData.dataChecked,
			deleted: undefined,
			deletedValue: undefined,
			disabled: undefined,
			disabledValue: undefined,
			linked: rowData.complete ? 'icon' : 'button',
			linkedValue: rowData.linked,
			primary: rowData.complete ? 'icon' : rowData.primary ? 'icon' : 'button',
			primaryValue: rowData.primary,
			reconciled: rowData.complete ? 'icon' : 'button',
			reconciledValue: rowData.reconciled
		}),
		onPrimary: ({ rowData, value, setOperationResult }) => {
			if (value)
				updateJournalEntryPrimary({
					oldPrimaryId: rowData.primaryJournalId,
					newPrimaryId: rowData.id,
					client,
					setOperationResult
				});
		},
		onLinked: ({ rowData, value, setOperationResult }) => {
			if (value)
				updateJournalEntryLink({
					id: rowData.primaryJournalId,
					client,
					setOperationResult
				});
			else {
				updateJournalEntryUnlink({
					id: rowData.primaryJournalId,
					client,
					setOperationResult
				});
			}
		},
		onDataChecked: ({ rowData, value, setOperationResult }) => {
			updateJournalEntryData({
				id: rowData.id,
				currentJournal: rowData,
				value: { dataChecked: value },
				client,
				setOperationResult
			});
		},
		onReconciled: ({ rowData, value, setOperationResult }) => {
			updateJournalEntryData({
				id: rowData.id,
				currentJournal: rowData,
				value: { reconciled: value },
				client,
				setOperationResult
			});
		},
		onComplete: ({ rowData, value, setOperationResult }) => {
			if (value) {
				updateTransactionComplete({
					id: rowData.primaryJournalId,
					client,
					setOperationResult
				});
			} else {
				updateTransactionIncomplete({
					id: rowData.primaryJournalId,
					client,
					setOperationResult
				});
			}
		}

		// on:completeButton={handleComplete}
	},
	{
		id: 'ag',
		editable: () => false,
		sortable: true,
		filterType: accountGroupingFilter,
		title: 'Account Grouping',
		type: 'text',
		align: 'left',
		value: (rowData) => rowData.accountGrouping?.title || ''
	},
	{
		id: 'date',
		editable: (rowData) => rowData.editable,
		sortable: true,
		title: 'Date',
		type: 'date',
		clearable: false,
		filterType: dateFilter,
		value: (rowData) => rowData.date,
		onUpdate: async ({ rowData, value, setOperationResult }) => {
			updateJournalEntryData({
				id: rowData.id,
				currentJournal: rowData,
				value: { date: value },
				client,
				setOperationResult
			});
		}
	},
	{
		id: 'account',
		type: 'accountSelect',
		editable: (rowData) => rowData.editable,
		sortable: true,
		filterType: accountFilter,
		title: 'Account',
		value: (rowData) => [
			{
				accountTitleCombined: rowData.account.accountTitleCombined || '',
				id: rowData.account.id,
				title: rowData.account.title,
				type: rowData.account.type
			}
		],
		align: 'left',
		clearable: false,
		onUpdate: async ({ rowData, value, setOperationResult }) => {
			if (rowData.editable && value) {
				const checkUUID = z.string().uuid().safeParse(value);
				if (checkUUID.success) {
					updateJournalEntryData({
						id: rowData.id,
						currentJournal: rowData,
						value: { accountId: value },
						client,
						setOperationResult
					});
				} else {
					updateJournalEntryNewExpense({
						client,
						setOperationResult,
						id: rowData.id,
						expenseName: value
					});
				}
			}
		}
	},
	{
		id: 'otherAccounts',
		type: 'accountSelect',
		editable: (rowData) => rowData.editable && rowData.primaryJournal.journalEntries.length <= 2,
		sortable: true,
		filterType: otherAccountsFilter,
		title: 'Payee',
		value: (rowData) => {
			const otherJournals = rowData.primaryJournal.journalEntries.filter(
				(item) => item.id !== rowData.id
			);

			return otherJournals.map((journal) => ({
				id: journal.account.id,
				title: journal.account.title,
				type: journal.account.type,
				accountTitleCombined: journal.account.accountTitleCombined || ''
			}));
		},
		align: 'left',
		clearable: false,
		onUpdate: async ({ rowData, value, setOperationResult }) => {
			if (rowData.primaryJournal.journalEntries.length <= 2 && rowData.editable && value) {
				const otherJournalID = rowData.primaryJournal.journalEntries.find(
					(item) => item.id !== rowData.id
				);
				if (!otherJournalID) return;
				const checkUUID = z.string().uuid().safeParse(value);
				if (checkUUID.success) {
					updateJournalEntryData({
						id: otherJournalID.id,
						currentJournal: { ...rowData, accountId: otherJournalID.account.id },
						value: { accountId: value },
						client,
						setOperationResult
					});
				} else {
					updateJournalEntryNewExpense({
						client,
						setOperationResult,
						id: otherJournalID.id,
						expenseName: value
					});
				}
			}
		}
	},
	{
		id: 'description',
		editable: (rowData) => rowData.editable,
		sortable: true,
		title: 'Description',
		type: 'text',
		filterType: descriptionFilter,
		value: (rowData) => rowData.description,
		onUpdate: async ({ rowData, value, setOperationResult }) => {
			updateJournalEntryData({
				id: rowData.id,
				currentJournal: rowData,
				value: { description: value },
				client,
				setOperationResult
			});
		}
	},
	{
		id: 'amount',
		editable: (rowData) =>
			rowData.amountEditable ||
			(rowData.editable && rowData.primaryJournal.journalEntries.length === 2),
		sortable: true,
		title: 'Amount',
		type: 'currency',
		filterType: amountFilter,
		value: (rowData) => rowData.amount,
		onUpdate: async ({ rowData, value, setOperationResult }) => {
			if (!value) return;
			if (!rowData.amountEditable) {
				if (rowData.editable && rowData.primaryJournal.journalEntries.length === 2) {
					const otherJournalID = rowData.primaryJournal.journalEntries.find(
						(item) => item.id !== rowData.id
					);
					if (!otherJournalID) return;
					updateJournalEntryData({
						id: otherJournalID.id,
						currentJournal: { ...rowData, amount: rowData.amount * -1.0 },
						value: { amount: -1.0 * value },
						client,
						setOperationResult
					});
				}
				return;
			}
			updateJournalEntryData({
				id: rowData.id,
				currentJournal: rowData,
				value: { amount: value },
				client,
				setOperationResult
			});
		}
	},
	{
		id: 'total',
		type: 'currency',
		editable: () => false,
		sortable: false,
		title: 'Total',
		value: (rowData) => rowData.total
	},
	{
		id: 'bill',
		type: 'billSelect',
		editable: (rowData) => rowData.editable,
		sortable: true,
		filterType: [...titleFilter('bill.title'), ...statusFilter('bill.status')],
		title: 'Bill',
		value: (rowData) => [
			{
				id: rowData.bill ? rowData.bill.id : '',
				title: rowData.bill ? rowData.bill.title : ''
			}
		],
		align: 'left',
		clearable: false,
		onUpdate: async ({ rowData, value, setOperationResult }) => {
			if (rowData.editable && value) {
				if (value === 'clear') {
					updateJournalEntryData({
						id: rowData.id,
						currentJournal: rowData,
						value: { billId: null },
						client,
						setOperationResult
					});
				} else {
					updateJournalEntryData({
						id: rowData.id,
						currentJournal: rowData,
						value: { billId: value },
						client,
						setOperationResult
					});
				}
			}
		}
	},
	{
		id: 'budget',
		type: 'budgetSelect',
		editable: (rowData) => rowData.editable,
		sortable: true,
		filterType: [...titleFilter('budget.title'), ...statusFilter('budget.status')],
		title: 'Budget',
		value: (rowData) => [
			{
				id: rowData.budget ? rowData.budget.id : '',
				title: rowData.budget ? rowData.budget.title : ''
			}
		],
		align: 'left',
		clearable: false,
		onUpdate: async ({ rowData, value, setOperationResult }) => {
			if (rowData.editable && value) {
				if (value === 'clear') {
					updateJournalEntryData({
						id: rowData.id,
						currentJournal: rowData,
						value: { budgetId: null },
						client,
						setOperationResult
					});
				} else {
					updateJournalEntryData({
						id: rowData.id,
						currentJournal: rowData,
						value: { budgetId: value },
						client,
						setOperationResult
					});
				}
			}
		}
	},
	{
		id: 'category',
		type: 'categorySelect',
		editable: (rowData) => rowData.editable,
		sortable: true,
		filterType: [
			...titleFilter('category.title'),
			{ filterType: 'text', key: 'category.group.contains', title: 'Group' },
			{ filterType: 'text', key: 'category.single.contains', title: 'Single' },
			...statusFilter('category.status')
		],
		title: 'Category',
		value: (rowData) => [
			{
				id: rowData.category ? rowData.category.id : '',
				title: rowData.category ? rowData.category.title : ''
			}
		],
		align: 'left',
		clearable: false,
		onUpdate: async ({ rowData, value, setOperationResult }) => {
			if (rowData.editable && value) {
				if (value === 'clear') {
					updateJournalEntryData({
						id: rowData.id,
						currentJournal: rowData,
						value: { categoryId: null },
						client,
						setOperationResult
					});
				} else {
					updateJournalEntryData({
						id: rowData.id,
						currentJournal: rowData,
						value: { categoryId: value },
						client,
						setOperationResult
					});
				}
			}
		}
	},
	{
		id: 'tag',
		type: 'tagSelect',
		editable: (rowData) => rowData.editable,
		sortable: true,
		filterType: [
			...titleFilter('tag.title'),
			{ filterType: 'text', key: 'tag.group.contains', title: 'Group' },
			{ filterType: 'text', key: 'tag.single.contains', title: 'Single' },
			...statusFilter('tag.status')
		],
		title: 'Tag',
		value: (rowData) => [
			{
				id: rowData.tag ? rowData.tag.id : '',
				title: rowData.tag ? rowData.tag.title : ''
			}
		],
		align: 'left',
		clearable: false,
		onUpdate: async ({ rowData, value, setOperationResult }) => {
			if (rowData.editable && value) {
				if (value === 'clear') {
					updateJournalEntryData({
						id: rowData.id,
						currentJournal: rowData,
						value: { tagId: null },
						client,
						setOperationResult
					});
				} else {
					updateJournalEntryData({
						id: rowData.id,
						currentJournal: rowData,
						value: { tagId: value },
						client,
						setOperationResult
					});
				}
			}
		}
	}
];
