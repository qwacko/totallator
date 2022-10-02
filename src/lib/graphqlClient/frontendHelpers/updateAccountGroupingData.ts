import {
	UpdateAccountGroupingMutationDocument,
	type UpdateAccountGroupingMutationMutation,
	type UpdateAccountGroupingMutationMutationVariables
} from '$lib/graphqlClient/generated';
import type {
	GetAccountGroupingsQuery,
	UpdateAccountGroupingInput
} from '$lib/graphqlClient/generated';
import { type Client, mutationStore } from '@urql/svelte';
import type { OperationResultStore } from '@urql/svelte/dist/types/common';

export type updateAccountGroupingResultStore = OperationResultStore<
	UpdateAccountGroupingMutationMutation,
	UpdateAccountGroupingMutationMutationVariables
>;

export const updateAccountGroupingData = async ({
	client,
	currentAccountGrouping,
	value,
	setOperationResult,
	id
}: {
	client: Client;
	currentAccountGrouping: GetAccountGroupingsQuery['accountGroupings'][0];
	value: UpdateAccountGroupingInput;
	setOperationResult: (value: updateAccountGroupingResultStore) => void;
	id: string;
}) => {
	// const keys = Object.keys(value)
	//Checks if any values have changed
	const keys = ['status', 'title'] as unknown as (keyof UpdateAccountGroupingInput)[];
	await Promise.all(
		keys.map(async (item) => {
			if (Object.keys(value).includes(item)) {
				if (currentAccountGrouping) {
					if (currentAccountGrouping[item] !== value[item]) {
						const result = mutationStore({
							client,
							query: UpdateAccountGroupingMutationDocument,
							variables: { id, input: value }
						});

						setOperationResult(result);
					}
				}
			}
			return undefined;
		})
	);
};
