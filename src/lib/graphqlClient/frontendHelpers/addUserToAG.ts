import type { GetAccountGroupingsQuery } from '$lib/graphqlClient/generated';
import { type Client, mutationStore } from '@urql/svelte';
import type { OperationResultStore } from '@urql/svelte/dist/types/common';

import {
	AddUserToAccountGroupingDocument,
	type AddUserToAccountGroupingMutation,
	type AddUserToAccountGroupingMutationVariables
} from '../generated';

export type AddNewUserTOAGResultStore = OperationResultStore<
	AddUserToAccountGroupingMutation,
	AddUserToAccountGroupingMutationVariables
>;

export const addNewUserToAG = async ({
	client,
	ag,
	email,
	setOperationResult
}: {
	client: Client;
	ag: GetAccountGroupingsQuery['accountGroupings'][0];
	email: string;
	setOperationResult: (val: AddNewUserTOAGResultStore) => void;
}) => {
	const result = mutationStore({
		client,
		query: AddUserToAccountGroupingDocument,
		variables: { email, id: ag.id }
	});
	setOperationResult(result);
};
