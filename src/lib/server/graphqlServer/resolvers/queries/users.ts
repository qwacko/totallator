// export const users = () => {};
import { authCheckPrisma } from '$lib/server/auth/authCheck';
import type { GraphqlQueryResolvers } from '$lib/server/graphqlServer/types/resolvers';
import prisma from '$lib/server/prisma/client';
import { GraphQLYogaError } from '@graphql-yoga/common';

import { GraphqlUserFromDBUser } from '../helpers/users/GraphqlUserFromDBUser';

export const user: GraphqlQueryResolvers['user'] = async (_, __, context) => {
	const { userId } = authCheckPrisma(context);

	const userData = await prisma.user.findUnique({ where: { id: userId } });

	if (!userData) {
		throw new GraphQLYogaError('Error Retrieving User Info');
	}

	return GraphqlUserFromDBUser(userData);
};
