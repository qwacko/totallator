import { SetUserToAgAdminDocument, SetUserToAgViewDocument } from '$lib/graphqlClient/generated';
import type {
	GetAccountGroupingsQuery,
	SetUserToAgAdminMutation,
	SetUserToAgAdminMutationVariables,
	SetUserToAgViewMutation,
	SetUserToAgViewMutationVariables
} from '$lib/graphqlClient/generated';
import { mutationStore } from '@urql/svelte';
import type { Client } from '@urql/svelte';
import type { OperationResultStore } from '@urql/svelte/dist/types/common';

export type SetUserToAdminResultStore = OperationResultStore<
	SetUserToAgAdminMutation,
	SetUserToAgAdminMutationVariables
>;

export const setUserToAGAdminMutation = async ({
	client,
	ag,
	userID,
	setOperationResult
}: {
	client: Client;
	ag: GetAccountGroupingsQuery['accountGroupings'][0];
	userID: string;
	setOperationResult: (val: SetUserToAdminResultStore) => void;
}) => {
	const result = mutationStore({
		client,
		query: SetUserToAgAdminDocument,
		variables: { agID: ag.id, userID }
	});
	setOperationResult(result);
};

export type SetUserToViewResultStore = OperationResultStore<
	SetUserToAgViewMutation,
	SetUserToAgViewMutationVariables
>;

export const setUserToAGViewMutation = async ({
	client,
	ag,
	userID,
	setOperationResult
}: {
	client: Client;
	ag: GetAccountGroupingsQuery['accountGroupings'][0];
	userID: string;
	setOperationResult: (val: SetUserToViewResultStore) => void;
}) => {
	const result = mutationStore({
		client,
		query: SetUserToAgViewDocument,
		variables: { agID: ag.id, userID }
	});
	setOperationResult(result);
};
