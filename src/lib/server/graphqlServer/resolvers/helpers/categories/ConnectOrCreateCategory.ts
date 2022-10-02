import type {
	CategoryFilter,
	InputMaybe
} from '$lib/server/graphqlServer/types/generated-resolvers';
import { categoryInclude } from '$lib/server/graphqlServer/types/models';
import { GraphQLYogaError } from '@graphql-yoga/common';
import type { Prisma, PrismaClient } from '@prisma/client';

import {
	CategoryCreateValidation,
	type CreateCategoryValidatedData
} from './CategoryCreateUpdateValidation';
import { CreateCategory } from './CreateCategory';
import { categoryFilterBuilder } from './categoryFilterBuilder';

export const CategoryCreateValidatedToFilter = (
	data: CreateCategoryValidatedData
): InputMaybe<CategoryFilter> => ({
	status: { equals: data.status },
	group: { equals: data.group },
	single: { equals: data.single },
	accountGroupingId: { equals: data.accountGroupingId }
});

export const ConnectOrCreateCategory = async ({
	client,
	userId,
	admin,
	data
}: {
	client: PrismaClient | Prisma.TransactionClient;
	userId: string;
	admin: boolean;
	data?: CreateCategoryValidatedData;
}) => {
	if (!data) {
		return undefined;
	}

	const validatedData = CategoryCreateValidation.parse(data);

	const foundCategories = await client.category.findMany({
		where: categoryFilterBuilder({
			filter: CategoryCreateValidatedToFilter(validatedData),
			userId,
			admin,
			requireAdmin: true
		}),
		include: categoryInclude
	});
	if (foundCategories.length > 1) {
		throw new GraphQLYogaError('More than one matching Category Cannot Link or Create');
	} else if (foundCategories.length === 1) {
		return foundCategories[0];
	}

	return CreateCategory({ client, data, userId, admin });
};
