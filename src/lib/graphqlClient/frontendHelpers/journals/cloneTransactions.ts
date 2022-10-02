import {
	CloneTransactionsDocument,
	type CloneTransactionsMutation,
	type CloneTransactionsMutationVariables,
	type UpdateJournalInput
} from '$lib/graphqlClient/generated';
import { mutationStore } from '@urql/svelte';
import type { Client } from '@urql/svelte';
import type { OperationResultStore } from '@urql/svelte/dist/types/common';

export const cloneTransactions = async ({
	ids,
	input,
	client,
	setOperationResult
}: {
	ids: string[];
	client: Client;
	input?: Omit<UpdateJournalInput, 'accountId' | 'amount'>;
	setOperationResult: (
		value: OperationResultStore<CloneTransactionsMutation, CloneTransactionsMutationVariables>
	) => void;
}) => {
	const result = mutationStore({
		client,
		query: CloneTransactionsDocument,
		variables: { ids, input }
	});
	setOperationResult(result);
};
