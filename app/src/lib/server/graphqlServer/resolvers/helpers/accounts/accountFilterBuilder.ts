import type {
	AccountFilter,
	InputMaybe
} from '$lib/server/graphqlServer/types/generated-resolvers';
import type { Prisma as PrismaType } from '@prisma/client';

import { AccountWhereValidation } from './AccountWhereValidation';

export const accountFilterBuilder = ({
	filter,
	userId,
	admin,
	requireAdmin = true
}: {
	filter: InputMaybe<AccountFilter> | undefined;
	userId: string;
	admin: boolean;
	requireAdmin?: boolean;
}): PrismaType.AccountWhereInput => {
	const agAccounts: PrismaType.AccountWhereInput = requireAdmin
		? { accountGrouping: { adminUsers: { some: { id: userId } } } }
		: { accountGrouping: { viewUsers: { some: { id: userId } } } };

	if (!filter) {
		if (admin) {
			return {};
		}
		return agAccounts;
	}
	const validatedInput = AccountWhereValidation.parse(filter);
	if (admin) {
		return validatedInput;
	}

	return {
		AND: [agAccounts, validatedInput]
	};
};
