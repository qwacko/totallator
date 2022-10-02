import type { BudgetFilter, InputMaybe } from '$lib/server/graphqlServer/types/generated-resolvers';
import { budgetInclude } from '$lib/server/graphqlServer/types/models';
import { GraphQLYogaError } from '@graphql-yoga/common';
import type { Prisma, PrismaClient } from '@prisma/client';

import {
	BudgetCreateValidation,
	type CreateBudgetValidatedData
} from './BudgetCreateUpdateValidation';
import { CreateBudget } from './CreateBudget';
import { budgetFilterBuilder } from './budgetFilterBuilder';

export const BudgetCreateValidatedToFilter = (
	data: CreateBudgetValidatedData
): InputMaybe<BudgetFilter> => ({
	status: { equals: data.status },
	title: { equals: data.title },
	accountGroupingId: { equals: data.accountGroupingId }
});

export const ConnectOrCreateBudget = async ({
	client,
	userId,
	admin,
	data
}: {
	client: PrismaClient | Prisma.TransactionClient;
	userId: string;
	admin: boolean;
	data?: CreateBudgetValidatedData;
}) => {
	if (!data) {
		return undefined;
	}

	const validatedData = BudgetCreateValidation.parse(data);

	const foundBudgets = await client.budget.findMany({
		where: budgetFilterBuilder({
			filter: BudgetCreateValidatedToFilter(validatedData),
			userId,
			admin,
			requireAdmin: true
		}),
		include: budgetInclude
	});
	if (foundBudgets.length > 1) {
		throw new GraphQLYogaError('More than one matching budget Cannot Link or Create');
	} else if (foundBudgets.length === 1) {
		return foundBudgets[0];
	}

	return CreateBudget({ client, data, userId, admin });
};
