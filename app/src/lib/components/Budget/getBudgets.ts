import { GetBudgetsDocument, type GetBudgetsQueryVariables } from '$lib/graphqlClient/generated';
import { removeBlankEmptyFromObject } from '$lib/utils/removeBlankEmptyFromObject';
import { Client, queryStore } from '@urql/svelte';

export const getBudgets = (client: Client, variables: GetBudgetsQueryVariables) => {
	const filter = removeBlankEmptyFromObject({ ...variables.filter });
	const newVariables = { ...variables, filter };

	const refetch = () => {
		queryStore({
			client,
			query: GetBudgetsDocument,
			variables: newVariables,
			requestPolicy: 'network-only'
		});
	};

	return {
		...queryStore({
			client,
			query: GetBudgetsDocument,
			variables: newVariables
		}),
		refetch
	};
};
