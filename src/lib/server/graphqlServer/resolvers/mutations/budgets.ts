import { authCheckPrisma } from '$lib/server/auth/authCheck';
import { budgetInclude } from '$lib/server/graphqlServer/types/models';
import type { GraphqlMutationResolvers } from '$lib/server/graphqlServer/types/resolvers';
import prisma from '$lib/server/prisma/client';

import { BudgetUpdateValidation } from '../helpers/budgets/BudgetCreateUpdateValidation';
import { CreateBudget } from '../helpers/budgets/CreateBudget';
import { budgetFilterBuilder } from '../helpers/budgets/budgetFilterBuilder';
import { basicStatusToDB } from '../helpers/general/basicStatusToDB';

export const createBudget: GraphqlMutationResolvers['createBudget'] = async (_, args, context) =>
	CreateBudget({ data: args.input, client: prisma, ...authCheckPrisma(context) });

export const updateBudgets: GraphqlMutationResolvers['updateBudgets'] = async (
	_,
	args,
	context
) => {
	const { userId, admin } = authCheckPrisma(context);
	const validatedInput = BudgetUpdateValidation.parse(args.input);

	const targetBudgets = await prisma.budget.findMany({
		where: budgetFilterBuilder({
			admin,
			filter: args.filter,
			userId,
			requireAdmin: true
		})
	});

	return prisma.$transaction(
		targetBudgets.map((budget) => {
			return prisma.budget.update({
				where: { id: budget.id },
				data: {
					...validatedInput,
					...(validatedInput.status ? basicStatusToDB(validatedInput.status) : {})
				},
				include: budgetInclude
			});
		})
	);
};
