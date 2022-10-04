import { authCheckPrisma } from '$lib/server/auth/authCheck';
import type { GraphqlAccountGrouping } from '$lib/server/graphqlServer/types/resolvers';
import type { User } from '@prisma/client';

export const AccountGrouping: GraphqlAccountGrouping = {
	allUsers: (parent): User[] => {
		return parent.viewUsers;
	},
	viewUsers: (parent): User[] => {
		const adminUsersIds = parent.adminUsers.map((item) => item.id);
		const viewUsersOnly = parent.viewUsers.filter((item) => !adminUsersIds.includes(item.id));

		return viewUsersOnly;
	},
	userIsAdmin: (parent, _, context): boolean => {
		const { userId, admin } = authCheckPrisma(context);
		return admin || parent.adminUsers.map((item) => item.id).includes(userId);
	}
};
