import { GetTagsDocument, type GetTagsQueryVariables } from '$lib/graphqlClient/generated';
import { removeBlankEmptyFromObject } from '$lib/utils/removeBlankEmptyFromObject';
import { Client, queryStore } from '@urql/svelte';

export const getTags = (client: Client, variables: GetTagsQueryVariables) => {
	const filter = removeBlankEmptyFromObject({ ...variables.filter });
	const newVariables = { ...variables, filter };
	return queryStore({
		client,
		query: GetTagsDocument,
		variables: newVariables
	});
};
