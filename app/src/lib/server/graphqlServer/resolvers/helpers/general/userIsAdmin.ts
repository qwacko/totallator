import { authCheckPrisma } from '$lib/server/auth/authCheck';
import type {
	Resolver,
	ResolverTypeWrapper
} from '$lib/server/graphqlServer/types/generated-resolvers';
import type { AccountModel, JournalEntryModel } from '$lib/server/graphqlServer/types/models';
import type { GraphqlContextUse } from '$lib/server/graphqlServer/types/resolvers';

type userIsAdminFunction = Resolver<
	ResolverTypeWrapper<boolean>,
	JournalEntryModel | AccountModel,
	GraphqlContextUse,
	unknown
>;

export const userIsAdmin: userIsAdminFunction = (parent, _, context) => {
	const { userId, admin } = authCheckPrisma(context);
	return admin || parent.accountGrouping.adminUsers.map((item) => item.id).includes(userId);
};

export const userIsAdminFunction = userIsAdmin;
