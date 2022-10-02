import type { BillFilter, InputMaybe } from '$lib/server/graphqlServer/types/generated-resolvers';
import type { Prisma as PrismaType } from '@prisma/client';

import { BillWhereValidation } from './BillWhereValidation';

export const billFilterBuilder = ({
	filter,
	userId,
	admin,
	requireAdmin = true
}: {
	filter: InputMaybe<BillFilter> | undefined;
	userId: string;
	admin: boolean;
	requireAdmin?: boolean;
}): PrismaType.BillWhereInput => {
	const agBills: PrismaType.BillWhereInput = requireAdmin
		? { accountGrouping: { adminUsers: { some: { id: userId } } } }
		: { accountGrouping: { viewUsers: { some: { id: userId } } } };

	if (!filter) {
		if (admin) {
			return {};
		}
		return agBills;
	}
	const validatedInput = BillWhereValidation.parse(filter);
	if (admin) {
		return validatedInput;
	}

	return {
		AND: [agBills, validatedInput]
	};
};
