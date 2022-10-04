import type {
	GetCategoriesQuery,
	UpdateCategoryInput,
	UpdateCategoryMutation,
	UpdateCategoryMutationVariables
} from '$lib/graphqlClient/generated';
import { UpdateCategoryDocument } from '$lib/graphqlClient/generated';
import { mutationStore } from '@urql/svelte';
import type { Client } from '@urql/svelte';
import type { OperationResultStore } from '@urql/svelte/dist/types/common';

import { getChangedObject } from '../getChangedObject';

export const updateCategoryDataUrql = async ({
	id,
	currentCategory,
	value,
	client,
	setOperationResult
}: {
	id: string;
	currentCategory: GetCategoriesQuery['categories'][0];
	value: UpdateCategoryInput;
	client: Client;
	setOperationResult: (
		value: OperationResultStore<UpdateCategoryMutation, UpdateCategoryMutationVariables>
	) => void;
}) => {
	const updatedItems = getChangedObject(currentCategory, value);

	//Only bother updating if there is any actual updated values
	if (Object.keys(updatedItems).length > 0) {
		const result = mutationStore({
			client,
			query: UpdateCategoryDocument,
			variables: { id, input: updatedItems }
		});
		setOperationResult(result);
	}
};
