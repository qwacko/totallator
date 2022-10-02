import type {
	CategoryFilter,
	InputMaybe
} from '$lib/server/graphqlServer/types/generated-resolvers';
import type { Prisma as PrismaType } from '@prisma/client';

import { CategoryWhereValidation } from './CategoryWhereValidation';

export const categoryFilterBuilder = ({
	filter,
	userId,
	admin,
	requireAdmin = true
}: {
	filter: InputMaybe<CategoryFilter> | undefined;
	userId: string;
	admin: boolean;
	requireAdmin?: boolean;
}): PrismaType.CategoryWhereInput => {
	const agCategories: PrismaType.CategoryWhereInput = requireAdmin
		? { accountGrouping: { adminUsers: { some: { id: userId } } } }
		: { accountGrouping: { viewUsers: { some: { id: userId } } } };

	if (!filter) {
		if (admin) {
			return {};
		}
		return agCategories;
	}
	const validatedInput = CategoryWhereValidation.parse(filter);
	if (admin) {
		return validatedInput;
	}

	return {
		AND: [agCategories, validatedInput]
	};
};
