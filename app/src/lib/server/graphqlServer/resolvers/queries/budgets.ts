import { authCheckPrisma } from '$lib/server/auth/authCheck';
import { budgetInclude } from '$lib/server/graphqlServer/types/models';
import type { GraphqlQueryResolvers } from '$lib/server/graphqlServer/types/resolvers';
import prisma from '$lib/server/prisma/client';

import { budgetFilterBuilder } from '../helpers/budgets/budgetFilterBuilder';
import { budgetSortBuilder } from '../helpers/budgets/budgetSortBuilder';

export const budgets: GraphqlQueryResolvers['budgets'] = async (_, args, context) => {
	const { userId, admin } = authCheckPrisma(context);

	const budgets = await prisma.budget.findMany({
		where: budgetFilterBuilder({ filter: args.filter, userId, admin, requireAdmin: false }),
		include: budgetInclude,
		skip: args.offset ? args.offset : 0,
		take: args.limit ? args.limit : 20,
		orderBy: budgetSortBuilder(args.sort)
	});
	const count = await prisma.budget.aggregate({
		where: budgetFilterBuilder({ filter: args.filter, userId, admin, requireAdmin: false }),
		_count: true
	});

	return { budgets, count: count._count, id: JSON.stringify(args) };
};
