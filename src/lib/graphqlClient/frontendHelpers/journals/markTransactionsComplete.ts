import {
	MarkTransactionsCompleteDocument,
	type MarkTransactionsCompleteMutation,
	type MarkTransactionsCompleteMutationVariables
} from '$lib/graphqlClient/generated';
import { mutationStore } from '@urql/svelte';
import type { Client } from '@urql/svelte';
import type { OperationResultStore } from '@urql/svelte/dist/types/common';

export const markTransactionsComplete = async ({
	ids,
	client,
	setOperationResult
}: {
	ids: string[];
	client: Client;
	setOperationResult: (
		value: OperationResultStore<
			MarkTransactionsCompleteMutation,
			MarkTransactionsCompleteMutationVariables
		>
	) => void;
}) => {
	const result = mutationStore({
		client,
		query: MarkTransactionsCompleteDocument,
		variables: { ids }
	});
	setOperationResult(result);
};
