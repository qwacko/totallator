import type { InputMaybe, TagFilter } from '$lib/server/graphqlServer/types/generated-resolvers';
import type { Prisma as PrismaType } from '@prisma/client';

import { TagWhereValidation } from './TagWhereValidation';

export const tagFilterBuilder = ({
	filter,
	userId,
	admin,
	requireAdmin = true
}: {
	filter: InputMaybe<TagFilter> | undefined;
	userId: string;
	admin: boolean;
	requireAdmin?: boolean;
}): PrismaType.TagWhereInput => {
	const agTags: PrismaType.TagWhereInput = requireAdmin
		? { accountGrouping: { adminUsers: { some: { id: userId } } } }
		: { accountGrouping: { viewUsers: { some: { id: userId } } } };

	if (!filter) {
		if (admin) {
			return {};
		}
		return agTags;
	}
	const validatedInput = TagWhereValidation.parse(filter);
	if (admin) {
		return validatedInput;
	}

	return {
		AND: [agTags, validatedInput]
	};
};
