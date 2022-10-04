import {
	AddExpenseToJournalsDocument,
	type AddExpenseToJournalsMutation,
	type AddExpenseToJournalsMutationVariables
} from '$lib/graphqlClient/generated';
import { mutationStore } from '@urql/svelte';
import type { Client } from '@urql/svelte';
import type { OperationResultStore } from '@urql/svelte/dist/types/common';

export const updateJournalEntryNewExpense = async ({
	id,
	expenseName,
	client,
	setOperationResult
}: {
	id: string;
	expenseName: string;
	client: Client;
	setOperationResult: (
		value: OperationResultStore<AddExpenseToJournalsMutation, AddExpenseToJournalsMutationVariables>
	) => void;
}) => {
	const result = mutationStore({
		client,
		query: AddExpenseToJournalsDocument,
		variables: { id, expenseName }
	});
	setOperationResult(result);
};
