import {
	GetCategoriesDocument,
	type GetCategoriesQueryVariables
} from '$lib/graphqlClient/generated';
import { removeBlankEmptyFromObject } from '$lib/utils/removeBlankEmptyFromObject';
import { Client, queryStore } from '@urql/svelte';

export const getCategories = (client: Client, variables: GetCategoriesQueryVariables) => {
	const filter = removeBlankEmptyFromObject({ ...variables.filter });
	const newVariables = { ...variables, filter };

	const refetch = () => {
		queryStore({
			client,
			query: GetCategoriesDocument,
			variables: newVariables,
			requestPolicy: 'network-only'
		});
	};

	return {
		...queryStore({
			client,
			query: GetCategoriesDocument,
			variables: newVariables
		}),
		refetch
	};
};
