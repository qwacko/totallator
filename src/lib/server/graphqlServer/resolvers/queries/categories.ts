import { authCheckPrisma } from '$lib/server/auth/authCheck';
import { categoryInclude } from '$lib/server/graphqlServer/types/models';
import type { GraphqlQueryResolvers } from '$lib/server/graphqlServer/types/resolvers';
import prisma from '$lib/server/prisma/client';

import { categoryFilterBuilder } from '../helpers/categories/categoryFilterBuilder';
import { categorySortBuilder } from '../helpers/categories/categorySortBuilder';

export const categories: GraphqlQueryResolvers['categories'] = async (_, args, context) => {
	const { userId, admin } = authCheckPrisma(context);

	const categories = await prisma.category.findMany({
		where: categoryFilterBuilder({ filter: args.filter, userId, admin, requireAdmin: false }),
		include: categoryInclude,
		skip: args.offset ? args.offset : 0,
		take: args.limit ? args.limit : 20,
		orderBy: categorySortBuilder(args.sort)
	});
	const count = await prisma.category.aggregate({
		where: categoryFilterBuilder({ filter: args.filter, userId, admin, requireAdmin: false }),
		_count: true
	});

	return { categories, count: count._count };
};
