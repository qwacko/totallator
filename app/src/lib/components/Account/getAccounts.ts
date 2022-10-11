import { GetAccountsDocument, type GetAccountsQueryVariables } from '$lib/graphqlClient/generated';
import { removeBlankEmptyFromObject } from '$lib/utils/removeBlankEmptyFromObject';
import { Client, queryStore } from '@urql/svelte';

export const getAccounts = (client: Client, variables: GetAccountsQueryVariables) => {
	const filter = removeBlankEmptyFromObject({ ...variables.filter });
	const newVariables = { ...variables, filter };

	const refetch = () => {
		queryStore({
			client,
			query: GetAccountsDocument,
			variables: newVariables,
			requestPolicy: 'network-only'
		});
	};

	return {
		...queryStore({
			client,
			query: GetAccountsDocument,
			variables: newVariables
		}),
		refetch
	};
};
