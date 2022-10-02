import {
	LinkTransactionDocument,
	type LinkTransactionMutation,
	type LinkTransactionMutationVariables,
	UnlinkTransactionDocument,
	type UnlinkTransactionMutation,
	type UnlinkTransactionMutationVariables
} from '$lib/graphqlClient/generated';
import { mutationStore } from '@urql/svelte';
import type { Client } from '@urql/svelte';
import type { OperationResultStore } from '@urql/svelte/dist/types/common';

export const updateJournalEntryLink = async ({
	id,
	client,
	setOperationResult
}: {
	id: string;
	client: Client;
	setOperationResult: (
		value: OperationResultStore<LinkTransactionMutation, LinkTransactionMutationVariables>
	) => void;
}) => {
	const result = mutationStore({
		client,
		query: LinkTransactionDocument,
		variables: { id }
	});
	setOperationResult(result);
};

export const updateJournalEntryUnlink = async ({
	id,
	client,
	setOperationResult
}: {
	id: string;
	client: Client;
	setOperationResult: (
		value: OperationResultStore<UnlinkTransactionMutation, UnlinkTransactionMutationVariables>
	) => void;
}) => {
	const result = mutationStore({
		client,
		query: UnlinkTransactionDocument,
		variables: { id }
	});
	setOperationResult(result);
};
