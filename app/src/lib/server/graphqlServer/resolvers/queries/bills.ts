import { authCheckPrisma } from '$lib/server/auth/authCheck';
import { billInclude } from '$lib/server/graphqlServer/types/models';
import type { GraphqlQueryResolvers } from '$lib/server/graphqlServer/types/resolvers';
import prisma from '$lib/server/prisma/client';

import { billFilterBuilder } from '../helpers/bills/billFilterBuilder';
import { billSortBuilder } from '../helpers/bills/billSortBuilder';

export const bills: GraphqlQueryResolvers['bills'] = async (_, args, context) => {
	const { userId, admin } = authCheckPrisma(context);

	const bills = await prisma.bill.findMany({
		where: billFilterBuilder({ filter: args.filter, userId, admin, requireAdmin: false }),
		include: billInclude,
		skip: args.offset ? args.offset : 0,
		take: args.limit ? args.limit : 20,
		orderBy: billSortBuilder(args.sort)
	});

	const count = await prisma.bill.aggregate({
		where: billFilterBuilder({ filter: args.filter, userId, admin, requireAdmin: false }),
		_count: true
	});

	return { bills, count: count._count, id: JSON.stringify(args) };
};
