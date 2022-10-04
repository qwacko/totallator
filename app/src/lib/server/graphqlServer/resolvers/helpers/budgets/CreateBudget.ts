import type { CreateBudgetInput } from '$lib/server/graphqlServer/types/generated-resolvers';
import { budgetInclude } from '$lib/server/graphqlServer/types/models';
import type { Prisma, PrismaClient } from '@prisma/client';

import { basicStatusToDBRequired } from '../general/basicStatusToDB';
import { checkAGAccess } from '../general/checkAGAccess';
import {
	BudgetCreateValidation,
	type CreateBudgetValidatedData
} from './BudgetCreateUpdateValidation';

export const CreateBudget = async ({
	client,
	userId,
	admin,
	data
}: {
	client: Prisma.TransactionClient | PrismaClient;
	userId: string;
	admin: boolean;
	data: CreateBudgetValidatedData | CreateBudgetInput;
}) => {
	const validatedInput = BudgetCreateValidation.parse(data);

	const { accountGroupingId, ...rest } = validatedInput;

	//Check Account Grouping Access
	await checkAGAccess({ accountGroupingId, admin, userId, needsAdminAccess: true });

	return client.budget.create({
		data: {
			...rest,
			accountGrouping: { connect: { id: accountGroupingId } },
			...basicStatusToDBRequired(rest.status)
		},
		include: budgetInclude
	});
};
