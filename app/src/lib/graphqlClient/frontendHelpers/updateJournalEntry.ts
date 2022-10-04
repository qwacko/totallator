import {
	type GetJournalsQuery,
	type UpdateJournalInput,
	UpdateSingleJournalDocument,
	type UpdateSingleJournalMutation,
	type UpdateSingleJournalMutationVariables
} from '$lib/graphqlClient/generated';
import { mutationStore } from '@urql/svelte';
import type { Client } from '@urql/svelte';
import type { OperationResultStore } from '@urql/svelte/dist/types/common';

export const updateJournalEntryData = async ({
	id,
	currentJournal,
	value,
	client,
	setOperationResult
}: {
	id: string;
	currentJournal: NonNullable<GetJournalsQuery['journalEntries']>['journalEntries'][0];
	value: UpdateJournalInput;
	client: Client;
	setOperationResult: (
		value: OperationResultStore<UpdateSingleJournalMutation, UpdateSingleJournalMutationVariables>
	) => void;
}) => {
	const updatedItems: UpdateJournalInput = {
		accountId:
			'accountId' in value &&
			value.accountId !== undefined &&
			value.accountId !== currentJournal.account.id
				? value.accountId
				: undefined,
		amount:
			'amount' in value && value.amount !== undefined && value.amount !== currentJournal.amount
				? value.amount
				: undefined,
		complete:
			'complete' in value &&
			value.complete !== undefined &&
			value.complete !== currentJournal.complete
				? value.complete
				: undefined,
		dataChecked:
			'dataChecked' in value &&
			value.dataChecked !== undefined &&
			value.dataChecked !== currentJournal.dataChecked
				? value.dataChecked
				: undefined,
		date:
			'date' in value && value.date !== undefined && value.date !== currentJournal.date
				? value.date
				: undefined,
		description:
			'description' in value &&
			value.description !== undefined &&
			value.description !== currentJournal.description
				? value.description
				: undefined,
		reconciled:
			'reconciled' in value &&
			value.reconciled !== undefined &&
			value.reconciled !== currentJournal.reconciled
				? value.reconciled
				: undefined,
		billId:
			'billId' in value && value.billId !== undefined && value.billId !== currentJournal.billId
				? value.billId
				: undefined,
		budgetId:
			'budgetId' in value &&
			value.budgetId !== undefined &&
			value.budgetId !== currentJournal.budgetId
				? value.budgetId
				: undefined,
		categoryId:
			'categoryId' in value &&
			value.categoryId !== undefined &&
			value.categoryId !== currentJournal.categoryId
				? value.categoryId
				: undefined,
		tagId:
			'tagId' in value && value.tagId !== undefined && value.tagId !== currentJournal.tagId
				? value.tagId
				: undefined
	};

	//Only bother updating if there is any actual updated values
	if (Object.keys(updatedItems).length > 0) {
		const result = mutationStore({
			client,
			query: UpdateSingleJournalDocument,
			variables: { id, input: updatedItems }
		});
		setOperationResult(result);
	}
};
