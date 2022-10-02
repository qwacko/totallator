import { GetJournalsDocument, type GetJournalsQueryVariables } from '$lib/graphqlClient/generated';
import { removeBlankEmptyFromObject } from '$lib/utils/removeBlankEmptyFromObject';
import { Client, queryStore } from '@urql/svelte';

export const getJournals = (client: Client, variables: GetJournalsQueryVariables) => {
	const filter = removeBlankEmptyFromObject({ ...variables.filter });
	const newVariables = { ...variables, filter };

	const refetch = () => {
		queryStore({
			client,
			query: GetJournalsDocument,
			variables: newVariables,
			requestPolicy: 'network-only'
		});
	};

	const data = queryStore({
		client,
		query: GetJournalsDocument,
		variables: newVariables
	});

	return { ...data, refetch };
};
