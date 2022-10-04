import { auth } from '$lib/server/auth/lucia';
import * as mutations from '$lib/server/graphqlServer/resolvers/mutations';
import * as queries from '$lib/server/graphqlServer/resolvers/queries';
import { getTypeDefs } from '$lib/server/graphqlServer/typeDefs';
import type { GraphqlResolvers } from '$lib/server/graphqlServer/types/resolvers';
import { useDepthLimit } from '@envelop/depth-limit';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createServer } from '@graphql-yoga/common';
import type { RequestEvent } from '@sveltejs/kit';
import { resolvers as scalarResolvers } from 'graphql-scalars';

import * as Scalars from './resolvers/scalars';

const resolvers: GraphqlResolvers = {
	...scalarResolvers,
	Query: queries,
	Mutation: mutations,
	...Scalars
};

const typeDefs = makeExecutableSchema({
	typeDefs: getTypeDefs(),
	resolvers
});

const yogaApp = createServer<RequestEvent>({
	schema: typeDefs,
	graphiql: {
		endpoint: '/api/graphql'
	},
	plugins: [useDepthLimit({ maxDepth: 6 })]
});

export const requestEventHandler = async (event: RequestEvent) => {
	try {
		const user = await auth.validateRequest(event.request);
		// @ts-expect-error Adding User
		return yogaApp.handleRequest(event.request, { ...event, user });
	} catch {
		return yogaApp.handleRequest(event.request, { ...event });
	}
};
