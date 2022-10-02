import type {
	GetAccountsQuery,
	UpdateAccountInput,
	UpdateAccountMutation,
	UpdateAccountMutationVariables
} from '$lib/graphqlClient/generated';
import { UpdateAccountDocument } from '$lib/graphqlClient/generated';
import { mutationStore } from '@urql/svelte';
import type { Client } from '@urql/svelte';
import type { OperationResultStore } from '@urql/svelte/dist/types/common';

export const updateAccountDataUrql = async ({
	id,
	currentAccount,
	value,
	client,
	setOperationResult
}: {
	id: string;
	currentAccount: GetAccountsQuery['accounts'][0];
	value: UpdateAccountInput;
	client: Client;
	setOperationResult: (
		value: OperationResultStore<UpdateAccountMutation, UpdateAccountMutationVariables>
	) => void;
}) => {
	const updatedItems: UpdateAccountInput = {};
	const keys: (keyof UpdateAccountInput)[] = Object.keys(value) as (keyof UpdateAccountInput)[];
	keys.map(async (item) => {
		if (
			Object.keys(value).includes(item) &&
			value[item] !== undefined &&
			currentAccount[item] !== value[item]
		) {
			updatedItems[item] = value[item];
		}
	});
	//Only bother updating if there is any actual updated values
	if (Object.keys(updatedItems).length > 0) {
		const result = mutationStore({
			client,
			query: UpdateAccountDocument,
			variables: { id, input: updatedItems }
		});
		setOperationResult(result);
	}

	// setLoading(false);
};
