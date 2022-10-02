import {
	MarkTransactionsIncompleteDocument,
	type MarkTransactionsIncompleteMutation,
	type MarkTransactionsIncompleteMutationVariables
} from '$lib/graphqlClient/generated';
import { mutationStore } from '@urql/svelte';
import type { Client } from '@urql/svelte';
import type { OperationResultStore } from '@urql/svelte/dist/types/common';

export const markTransactionsIncomplete = async ({
	ids,
	client,
	setOperationResult
}: {
	ids: string[];
	client: Client;
	setOperationResult: (
		value: OperationResultStore<
			MarkTransactionsIncompleteMutation,
			MarkTransactionsIncompleteMutationVariables
		>
	) => void;
}) => {
	const result = mutationStore({
		client,
		query: MarkTransactionsIncompleteDocument,
		variables: { ids }
	});
	setOperationResult(result);
};
