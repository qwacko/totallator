import type {
	InputMaybe,
	JournalEntryFilter
} from '$lib/server/graphqlServer/types/generated-resolvers';
import type { Prisma as PrismaType } from '@prisma/client';

import { JournalEntryWhereValidation } from './JournalEntryWhereValidation';

export const journalFilterBuilder = ({
	filter,
	userId,
	admin,
	requireAdmin = true
}: {
	filter: InputMaybe<JournalEntryFilter> | undefined;
	userId: string;
	admin: boolean;
	requireAdmin?: boolean;
}): PrismaType.JournalEntryWhereInput => {
	const agAccounts: PrismaType.AccountWhereInput = requireAdmin
		? { accountGrouping: { adminUsers: { some: { id: userId } } } }
		: { accountGrouping: { viewUsers: { some: { id: userId } } } };

	if (!filter) {
		if (admin) {
			return {};
		}
		return agAccounts;
	}
	const validatedInput = JournalEntryWhereValidation.parse(filter);
	if (admin) {
		return validatedInput;
	}

	return {
		AND: [agAccounts, validatedInput, { journalEntries: {} }]
	};
};
