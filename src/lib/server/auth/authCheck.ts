import { GraphQLYogaError } from '@graphql-yoga/common';

import type { GraphqlContext } from '../graphqlServer/types/yogaContext';

export const authCheckPrisma = (context: GraphqlContext) => {
	if (!context?.user?.user?.user_id) {
		throw new GraphQLYogaError('User Not Logged In');
	}

	return { userId: context.user.user.user_id, admin: context.user.user.admin };
};
