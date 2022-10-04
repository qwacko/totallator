import type {
	GetBudgetsQuery,
	UpdateBudgetInput,
	UpdateBudgetMutation,
	UpdateBudgetMutationVariables
} from '$lib/graphqlClient/generated';
import { UpdateBudgetDocument } from '$lib/graphqlClient/generated';
import { mutationStore } from '@urql/svelte';
import type { Client } from '@urql/svelte';
import type { OperationResultStore } from '@urql/svelte/dist/types/common';

import { getChangedObject } from '../getChangedObject';

export const updateBudgetDataUrql = async ({
	id,
	currentBudget,
	value,
	client,
	setOperationResult
}: {
	id: string;
	currentBudget: GetBudgetsQuery['budgets'][0];
	value: UpdateBudgetInput;
	client: Client;
	setOperationResult: (
		value: OperationResultStore<UpdateBudgetMutation, UpdateBudgetMutationVariables>
	) => void;
}) => {
	const updatedItems = getChangedObject(currentBudget, value);

	//Only bother updating if there is any actual updated values
	if (Object.keys(updatedItems).length > 0) {
		const result = mutationStore({
			client,
			query: UpdateBudgetDocument,
			variables: { id, input: updatedItems }
		});
		setOperationResult(result);
	}
};
