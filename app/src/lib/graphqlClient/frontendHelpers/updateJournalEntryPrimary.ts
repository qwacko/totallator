import {
	UpdatePrimaryDocument,
	type UpdatePrimaryMutation,
	type UpdatePrimaryMutationVariables
} from '$lib/graphqlClient/generated';
import { mutationStore } from '@urql/svelte';
import type { Client } from '@urql/svelte';
import type { OperationResultStore } from '@urql/svelte/dist/types/common';

export const updateJournalEntryPrimary = async ({
	oldPrimaryId,
	newPrimaryId,
	client,
	setOperationResult
}: {
	oldPrimaryId: string;
	newPrimaryId: string;
	client: Client;
	setOperationResult: (
		value: OperationResultStore<UpdatePrimaryMutation, UpdatePrimaryMutationVariables>
	) => void;
}) => {
	const result = mutationStore({
		client,
		query: UpdatePrimaryDocument,
		variables: { newPrimaryId, oldPrimaryId }
	});
	setOperationResult(result);
};
