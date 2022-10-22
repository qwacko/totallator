import { devtoolsExchange } from '@urql/devtools';
import { createClient, defaultExchanges } from '@urql/svelte';
import { cacheExchange } from '@urql/exchange-graphcache';
import schema from './urqlGenerated';

export const urqlclient = (access_token: string | undefined) =>
	createClient({
		url: '/api/graphql',
		requestPolicy: 'cache-and-network',
		exchanges: [
			devtoolsExchange,
			cacheExchange({
				schema,
				keys: {
					ImportChecksReturn: () => null,
					ImportDataResult: () => null,
					ImportDataReturn: () => null
				}
			}),
			...defaultExchanges
		],
		fetchOptions: {
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		}
	});
