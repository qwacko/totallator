import {
	CreateAccountGroupingMutationDocument,
	type CreateAccountGroupingMutationMutation,
	type CreateAccountGroupingMutationMutationVariables
} from '$lib/graphqlClient/generated';
import { mutationStore } from '@urql/svelte';
import type { Client } from '@urql/svelte';
import type { OperationResultStore } from '@urql/svelte/dist/types/common';

export type createAccountGroupingResultStore = OperationResultStore<
	CreateAccountGroupingMutationMutation,
	CreateAccountGroupingMutationMutationVariables
>;

export const createAccountGrouping = async ({
	client,
	newTitle,
	complete,
	setOperationResult
}: {
	client: Client;
	newTitle: string;
	complete?: () => void;
	setOperationResult: (value: createAccountGroupingResultStore) => void;
}) => {
	if (newTitle && newTitle.length > 2) {
		const result = mutationStore({
			client,
			query: CreateAccountGroupingMutationDocument,
			variables: { input: { title: newTitle } }
		});

		setOperationResult(result);
	}
	complete && complete();
};
