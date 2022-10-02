import type {
	GetBillsQuery,
	UpdateBillInput,
	UpdateBillMutation,
	UpdateBillMutationVariables
} from '$lib/graphqlClient/generated';
import { UpdateBillDocument } from '$lib/graphqlClient/generated';
import { mutationStore } from '@urql/svelte';
import type { Client } from '@urql/svelte';
import type { OperationResultStore } from '@urql/svelte/dist/types/common';

import { getChangedObject } from '../getChangedObject';

export const updateBillDataUrql = async ({
	id,
	currentBill,
	value,
	client,
	setOperationResult
}: {
	id: string;
	currentBill: GetBillsQuery['bills'][0];
	value: UpdateBillInput;
	client: Client;
	setOperationResult: (
		value: OperationResultStore<UpdateBillMutation, UpdateBillMutationVariables>
	) => void;
}) => {
	const updatedItems = getChangedObject(currentBill, value);

	//Only bother updating if there is any actual updated values
	if (Object.keys(updatedItems).length > 0) {
		const result = mutationStore({
			client,
			query: UpdateBillDocument,
			variables: { id, input: updatedItems }
		});
		setOperationResult(result);
	}
};
