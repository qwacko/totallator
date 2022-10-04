import { authCheckPrisma } from '$lib/server/auth/authCheck';
import { accountInclude } from '$lib/server/graphqlServer/types/models';
import type { GraphqlQueryResolvers } from '$lib/server/graphqlServer/types/resolvers';
import prisma from '$lib/server/prisma/client';

import { accountFilterBuilder } from '../helpers/accounts/accountFilterBuilder';
import { accountSortBuilder } from '../helpers/accounts/accountSortBuilder';

export const accounts: GraphqlQueryResolvers['accounts'] = async (_, args, context) => {
	const { userId, admin } = authCheckPrisma(context);

	const accounts = await prisma.account.findMany({
		where: accountFilterBuilder({ filter: args.filter, userId, admin, requireAdmin: false }),
		include: accountInclude,
		skip: args.offset ? args.offset : 0,
		take: args.limit ? args.limit : 20,
		orderBy: accountSortBuilder(args.sort)
	});

	const count = await prisma.account.aggregate({
		where: accountFilterBuilder({ filter: args.filter, userId, admin, requireAdmin: false }),
		_count: true
	});

	return { accounts, count: count._count };
};
