import { cloneTransactions } from '$lib/graphqlClient/frontendHelpers/journals/cloneTransactions';
import { deleteJournals } from '$lib/graphqlClient/frontendHelpers/journals/deleteJournals';
import { markTransactionsComplete } from '$lib/graphqlClient/frontendHelpers/journals/markTransactionsComplete';
import { markTransactionsIncomplete } from '$lib/graphqlClient/frontendHelpers/journals/markTransactionsIncomplete';
import type { Client } from '@urql/svelte';
import type { OperationResultStore } from '@urql/svelte/dist/types/common';
import { format } from 'date-fns';

import type { TableBulkActions } from '../Table/TableTypes';
import type { addTotalsToJournalsType } from './addTotalsToJournals';

type addTotalsRequired = NonNullable<addTotalsToJournalsType>;

//LATER Add Bulk Edit Clone (Clone and Edit The Value Added)

export const getJournalActions = ({
	client,
	selection,
	setExternalOperationStore,
	openEditPopup
}: {
	client: Client;
	selection: addTotalsToJournalsType;
	setExternalOperationStore?: (store: OperationResultStore) => void;
	openEditPopup: () => void;
}) => {
	const userAdminOfAll = selection
		? selection.filter((item) => !item.userIsAdmin).length === 0
		: false;

	const hasAnUnmodifiableTransaction = selection
		? selection.filter((item) => !item.editable).length > 0
		: true;

	const noneSelected = selection && selection.length === 0;
	const someComplete = selection && selection.filter((item) => item.complete).length > 0;
	const someIncomplete = selection && selection.filter((item) => !item.complete).length > 0;

	// const primarySelected = selection ? selection.filter((item) => item.primary).length > 0 : true;

	//Fucntion to make the table store and the external store both be updated if necessary
	const setBothOperationStore = (
		internalFunction: ((newStore: OperationResultStore) => void) | undefined
	) => {
		return (store: OperationResultStore) => {
			if (setExternalOperationStore) {
				setExternalOperationStore(store);
			}
			if (internalFunction) {
				internalFunction(store);
			}
		};
	};

	const allActions: TableBulkActions<addTotalsRequired> = [
		{
			title: 'Clone ',
			action: async ({ items, setLoading, setSelected, setOperationStore }) => {
				if (items && items.length > 0) {
					setLoading && setLoading(true);
					const targetTransactions = [...new Set(items.map((item) => item.primaryJournalId))];
					cloneTransactions({
						ids: targetTransactions,
						setOperationResult: setBothOperationStore(setOperationStore),
						client
					});

					//Short Timeout To Make Sure Spinner Is Shown
					setTimeout(() => {
						setLoading && setLoading(false);
						setSelected && setSelected([]);
					}, 500);
				}
			},
			disabled: !userAdminOfAll || noneSelected,
			disabledReason: noneSelected ? 'No Selection' : "User isn't admin of all selected"
		},
		{
			title: 'Clone With New Date',
			action: async ({ items, setLoading, setSelected, setOperationStore }) => {
				if (items && items.length > 0) {
					setLoading && setLoading(true);
					const targetTransactions = [...new Set(items.map((item) => item.primaryJournalId))];
					cloneTransactions({
						ids: targetTransactions,
						input: {
							date: format(new Date(), 'yyyy-MM-dd')
						},
						setOperationResult: setBothOperationStore(setOperationStore),
						client
					});

					//Short Timeout To Make Sure Spinner Is Shown
					setTimeout(() => {
						setLoading && setLoading(false);
						setSelected && setSelected([]);
					}, 500);
				}
			},
			disabled: !userAdminOfAll || noneSelected,
			disabledReason: noneSelected ? 'No Selection' : "User isn't admin of all selected"
		},
		{
			title: 'Delete Transactions',
			action: async ({ items, setLoading, setSelected, setOperationStore }) => {
				if (items && items.length > 0) {
					setLoading && setLoading(true);
					const targetJournals: string[] = items.reduce((prev, current) => {
						return [...prev, ...current.primaryJournal.journalEntries.map((item) => item.id)];
					}, [] as string[]);
					const targetJournalsSet = [...new Set(targetJournals)];
					deleteJournals({
						ids: targetJournalsSet,
						setOperationResult: setBothOperationStore(setOperationStore),
						client
					});

					//Short Timeout To Make Sure Spinner Is Shown
					setTimeout(() => {
						setLoading && setLoading(false);
						setSelected && setSelected([]);
					}, 500);
				}
			},
			disabled: hasAnUnmodifiableTransaction || !userAdminOfAll || noneSelected,
			disabledReason: noneSelected ? 'No Selection' : 'Not all journals are editable.'
		},
		{
			title: 'Edit Journals',
			action: async ({ items }) => {
				if (items && items.length > 0) {
					openEditPopup();
				}
			},
			disabled: hasAnUnmodifiableTransaction || !userAdminOfAll || noneSelected,
			disabledReason: noneSelected ? 'No Selection' : 'Not all journals are editable.'
		},
		{
			title: 'Mark Incomplete',
			action: async ({ items, setLoading, setSelected, setOperationStore }) => {
				if (items && items.length > 0) {
					setLoading && setLoading(true);
					const targetTransactions = [...new Set(items.map((item) => item.primaryJournalId))];
					markTransactionsIncomplete({
						ids: targetTransactions,
						setOperationResult: setBothOperationStore(setOperationStore),
						client
					});

					//Short Timeout To Make Sure Spinner Is Shown
					setTimeout(() => {
						setLoading && setLoading(false);
						setSelected && setSelected([]);
					}, 500);
				}
			},
			disabled: !userAdminOfAll || noneSelected || !someComplete,
			disabledReason: noneSelected
				? 'No Selection'
				: !someComplete
				? 'No Transactions Are Complete'
				: "User isn't admin of all selected"
		},
		{
			title: 'Mark Complete',
			action: async ({ items, setLoading, setSelected, setOperationStore }) => {
				if (items && items.length > 0) {
					setLoading && setLoading(true);
					const targetTransactions = [...new Set(items.map((item) => item.primaryJournalId))];
					markTransactionsComplete({
						ids: targetTransactions,
						setOperationResult: setBothOperationStore(setOperationStore),
						client
					});

					//Short Timeout To Make Sure Spinner Is Shown
					setTimeout(() => {
						setLoading && setLoading(false);
						setSelected && setSelected([]);
					}, 500);
				}
			},
			disabled: !userAdminOfAll || noneSelected || !someIncomplete,
			disabledReason: noneSelected
				? 'No Selection'
				: !someIncomplete
				? 'No Transactions Are Incomplete'
				: "User isn't admin of all selected"
		}
	];

	return allActions;
};
