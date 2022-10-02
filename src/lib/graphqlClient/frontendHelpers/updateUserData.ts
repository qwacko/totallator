import {
	UpdateUserMutationDocument,
	type UpdateUserMutationMutation,
	type UpdateUserMutationMutationVariables
} from '$lib/graphqlClient/generated';
import type { GetUserDataQuery, UpdateUserInput } from '$lib/graphqlClient/generated';
import { type Client, mutationStore } from '@urql/svelte';
import type { OperationResultStore } from '@urql/svelte/dist/types/common';

export type UpdateUserDataResultStore = OperationResultStore<
	UpdateUserMutationMutation,
	UpdateUserMutationMutationVariables
>;

export const updateUserData = async ({
	currentUser,
	value,
	client,
	setOperationResult
}: {
	client: Client;
	currentUser: GetUserDataQuery['user'];
	value: UpdateUserInput;
	setOperationResult: (val: UpdateUserDataResultStore) => void;
}) => {
	// const keys = Object.keys(value)
	//Checks if any values have changed
	const keys = [
		'firstName',
		'lastName',
		'dateFormat',
		'currencyFormat',
		'firstMonthFY'
	] as unknown as (keyof UpdateUserInput)[];
	await Promise.all(
		keys.map(async (item) => {
			if (Object.keys(value).includes(item)) {
				if (currentUser) {
					if (currentUser[item] !== value[item]) {
						const result = mutationStore({
							client,
							query: UpdateUserMutationDocument,
							variables: { input: value }
						});
						setOperationResult(result);
					}
				}
			}
			return undefined;
		})
	);
};
