import {
	IncompleteTransactionDocument,
	type IncompleteTransactionMutation,
	type IncompleteTransactionMutationVariables,
	CompleteTransactionDocument,
	type CompleteTransactionMutation,
	type CompleteTransactionMutationVariables
} from '$lib/graphqlClient/generated';
import { mutationStore } from '@urql/svelte';
import type { Client } from '@urql/svelte';
import type { OperationResultStore } from '@urql/svelte/dist/types/common';

export const updateTransactionComplete = async ({
	id,
	client,
	setOperationResult
}: {
	id: string;
	client: Client;
	setOperationResult: (
		value: OperationResultStore<CompleteTransactionMutation, CompleteTransactionMutationVariables>
	) => void;
}) => {
	const result = mutationStore({
		client,
		query: CompleteTransactionDocument,
		variables: { id }
	});
	setOperationResult(result);
};

export const updateTransactionIncomplete = async ({
	id,
	client,
	setOperationResult
}: {
	id: string;
	client: Client;
	setOperationResult: (
		value: OperationResultStore<
			IncompleteTransactionMutation,
			IncompleteTransactionMutationVariables
		>
	) => void;
}) => {
	const result = mutationStore({
		client,
		query: IncompleteTransactionDocument,
		variables: { id }
	});
	setOperationResult(result);
};
