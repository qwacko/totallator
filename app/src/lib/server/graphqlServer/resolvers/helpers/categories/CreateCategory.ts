import type { CreateCategoryInput } from '$lib/server/graphqlServer/types/generated-resolvers';
import { categoryInclude } from '$lib/server/graphqlServer/types/models';
import type { Prisma, PrismaClient } from '@prisma/client';

import { basicStatusToDBRequired } from '../general/basicStatusToDB';
import { checkAGAccess } from '../general/checkAGAccess';
import {
	CategoryCreateValidation,
	type CreateCategoryValidatedData
} from './CategoryCreateUpdateValidation';
import { generateCategoryTitle } from './generateCategoryTitle';

export const CreateCategory = async ({
	client,
	userId,
	admin,
	data
}: {
	client: Prisma.TransactionClient | PrismaClient;
	userId: string;
	admin: boolean;
	data: CreateCategoryValidatedData | CreateCategoryInput;
}) => {
	const validatedInput = CategoryCreateValidation.parse(data);

	const { accountGroupingId, ...rest } = validatedInput;

	//Check Account Grouping Access
	await checkAGAccess({ accountGroupingId, admin, userId, needsAdminAccess: true });

	return client.category.create({
		data: {
			...rest,
			accountGrouping: { connect: { id: accountGroupingId } },
			...basicStatusToDBRequired(rest.status),
			...generateCategoryTitle({
				group: rest.group,
				single: rest.single
			})
		},
		include: categoryInclude
	});
};
