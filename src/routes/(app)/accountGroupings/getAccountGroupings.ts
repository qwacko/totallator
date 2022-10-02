import { GetAccountGroupingsDocument } from '$lib/graphqlClient/generated';
import { Client, queryStore } from '@urql/svelte';

export const getAccountGroupings = (client: Client) =>
	queryStore({
		client,
		query: GetAccountGroupingsDocument
	});
