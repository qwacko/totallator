import {
	DeleteJournalsDocument,
	type DeleteJournalsMutation,
	type DeleteJournalsMutationVariables
} from '$lib/graphqlClient/generated';
import { mutationStore } from '@urql/svelte';
import type { Client } from '@urql/svelte';
import type { OperationResultStore } from '@urql/svelte/dist/types/common';

export const deleteJournals = async ({
	ids,
	client,
	setOperationResult
}: {
	ids: string[];
	client: Client;
	setOperationResult: (
		value: OperationResultStore<DeleteJournalsMutation, DeleteJournalsMutationVariables>
	) => void;
}) => {
	const result = mutationStore({
		client,
		query: DeleteJournalsDocument,
		variables: { ids }
	});
	setOperationResult(result);
};
