import { authCheckPrisma } from '$lib/server/auth/authCheck';
import { tagInclude } from '$lib/server/graphqlServer/types/models';
import type { GraphqlQueryResolvers } from '$lib/server/graphqlServer/types/resolvers';
import prisma from '$lib/server/prisma/client';

import { tagFilterBuilder } from '../helpers/tags/tagFilterBuilder';
import { tagSortBuilder } from '../helpers/tags/tagSortBuilder';

export const tags: GraphqlQueryResolvers['tags'] = async (_, args, context) => {
	const { userId, admin } = authCheckPrisma(context);

	const tags = await prisma.tag.findMany({
		where: tagFilterBuilder({ filter: args.filter, userId, admin, requireAdmin: false }),
		include: tagInclude,
		skip: args.offset ? args.offset : 0,
		take: args.limit ? args.limit : 20,
		orderBy: tagSortBuilder(args.sort)
	});

	const count = await prisma.tag.aggregate({
		where: tagFilterBuilder({ filter: args.filter, userId, admin, requireAdmin: false }),
		_count: true
	});

	return { tags, count: count._count };
};
