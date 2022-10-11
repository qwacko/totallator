import { GetBillsDocument, type GetBillsQueryVariables } from '$lib/graphqlClient/generated';
import { removeBlankEmptyFromObject } from '$lib/utils/removeBlankEmptyFromObject';
import { Client, queryStore } from '@urql/svelte';

export const getBills = (client: Client, variables: GetBillsQueryVariables) => {
	const filter = removeBlankEmptyFromObject({ ...variables.filter });
	const newVariables = { ...variables, filter };

	const refetch = () => {
		queryStore({
			client,
			query: GetBillsDocument,
			variables: newVariables,
			requestPolicy: 'network-only'
		});
	};

	return {
		...queryStore({
			client,
			query: GetBillsDocument,
			variables: newVariables
		}),
		refetch
	};
};
