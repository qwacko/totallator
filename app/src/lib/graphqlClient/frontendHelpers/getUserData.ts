import { GetUserDataDocument } from '$lib/graphqlClient/generated';
import { Client, queryStore } from '@urql/svelte';

export const getUserData = (client: Client) =>
	queryStore({
		client,
		query: GetUserDataDocument
	});
