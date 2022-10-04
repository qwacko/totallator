import type { BudgetFilter, InputMaybe } from '$lib/server/graphqlServer/types/generated-resolvers';
import type { Prisma as PrismaType } from '@prisma/client';

import { BudgetWhereValidation } from './BudgetWhereValidation';

export const budgetFilterBuilder = ({
	filter,
	userId,
	admin,
	requireAdmin = true
}: {
	filter: InputMaybe<BudgetFilter> | undefined;
	userId: string;
	admin: boolean;
	requireAdmin?: boolean;
}): PrismaType.BudgetWhereInput => {
	const agBudgets: PrismaType.BudgetWhereInput = requireAdmin
		? { accountGrouping: { adminUsers: { some: { id: userId } } } }
		: { accountGrouping: { viewUsers: { some: { id: userId } } } };

	if (!filter) {
		if (admin) {
			return {};
		}
		return agBudgets;
	}
	const validatedInput = BudgetWhereValidation.parse(filter);
	if (admin) {
		return validatedInput;
	}

	return {
		AND: [agBudgets, validatedInput]
	};
};
