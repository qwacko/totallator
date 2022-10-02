import type {
	GetTagsQuery,
	UpdateTagInput,
	UpdateTagMutation,
	UpdateTagMutationVariables
} from '$lib/graphqlClient/generated';
import { UpdateTagDocument } from '$lib/graphqlClient/generated';
import { mutationStore } from '@urql/svelte';
import type { Client } from '@urql/svelte';
import type { OperationResultStore } from '@urql/svelte/dist/types/common';

import { getChangedObject } from '../getChangedObject';

export const updateTagDataUrql = async ({
	id,
	currentTag,
	value,
	client,
	setOperationResult
}: {
	id: string;
	currentTag: GetTagsQuery['tags'][0];
	value: UpdateTagInput;
	client: Client;
	setOperationResult: (
		value: OperationResultStore<UpdateTagMutation, UpdateTagMutationVariables>
	) => void;
}) => {
	const updatedItems = getChangedObject(currentTag, value);

	//Only bother updating if there is any actual updated values
	if (Object.keys(updatedItems).length > 0) {
		const result = mutationStore({
			client,
			query: UpdateTagDocument,
			variables: { id, input: updatedItems }
		});
		setOperationResult(result);
	}
};
