import type { GetAccountGroupingsQuery } from '$lib/graphqlClient/generated';
import { type Client, mutationStore } from '@urql/svelte';
import type { OperationResultStore } from '@urql/svelte/dist/types/common';

import {
	RemoveUserFromAccountGroupingDocument,
	type RemoveUserFromAccountGroupingMutation,
	type RemoveUserFromAccountGroupingMutationVariables
} from '../generated';

export type RemoveUserFromAGResultStore = OperationResultStore<
	RemoveUserFromAccountGroupingMutation,
	RemoveUserFromAccountGroupingMutationVariables
>;

export const removeUserFromAG = async ({
	ag,
	userID,
	client,
	setOperationResult
}: {
	ag: GetAccountGroupingsQuery['accountGroupings'][0];
	userID: string;
	client: Client;
	setOperationResult: (val: RemoveUserFromAGResultStore) => void;
}) => {
	const result = mutationStore({
		client,
		query: RemoveUserFromAccountGroupingDocument,
		variables: { userID, agID: ag.id }
	});
	setOperationResult(result);
};
