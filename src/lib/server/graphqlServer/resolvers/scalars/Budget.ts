import type { GraphqlAccount } from '$lib/server/graphqlServer/types/resolvers';

import { userIsAdmin } from '../helpers/general/userIsAdmin';

export const Budget: GraphqlAccount = {
	userIsAdmin
};
