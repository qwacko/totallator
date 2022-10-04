import type { User as UserGraphQL } from '$lib/server/graphqlServer/types/generated-resolvers';
import type { User } from '@prisma/client';

import { userReadSettingsValidation } from './UserSettingsValidation';

export const GraphqlUserFromDBUser = (user: User): UserGraphQL => {
	const { settings, ...otherUserStuff } = user;

	const validatedSettings = userReadSettingsValidation.parse(settings ? settings : {});

	return { ...otherUserStuff, ...validatedSettings };
};
