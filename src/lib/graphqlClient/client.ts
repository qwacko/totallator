import { devtoolsExchange } from '@urql/devtools';
import { createClient, defaultExchanges } from '@urql/svelte';

export const urqlclient = (access_token: string | undefined) =>
	createClient({
		url: '/api/graphql',
		requestPolicy: 'cache-and-network',
		exchanges: [devtoolsExchange, ...defaultExchanges],
		fetchOptions: {
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		}
	});
