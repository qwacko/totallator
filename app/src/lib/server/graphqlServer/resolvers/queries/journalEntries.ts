import { authCheckPrisma } from '$lib/server/auth/authCheck';
import type { GraphqlQueryResolvers } from '$lib/server/graphqlServer/types/resolvers';
import prisma from '$lib/server/prisma/client';

import { journalEntriesInclude } from '../../types/models';
import { journalEntrySortBuilder } from '../helpers/journalEntries/journalEntrySortBuilder';
import { journalFilterBuilder } from '../helpers/journalEntries/journalFilterBuilder';

export const journalEntries: GraphqlQueryResolvers['journalEntries'] = async (_, args, context) => {
	const { userId, admin } = authCheckPrisma(context);
	const offset = args.offset === undefined ? 0 : args.offset === null ? 0 : args.offset;
	const limit = args.limit === undefined ? 20 : args.limit === null ? 20 : args.limit;

	const journalEntries = await prisma.journalEntry.findMany({
		where: journalFilterBuilder({ filter: args.filter, userId, admin, requireAdmin: false }),
		orderBy: journalEntrySortBuilder(args.sort),
		skip: offset,
		take: limit,
		include: journalEntriesInclude
	});

	const count = await prisma.journalEntry.aggregate({
		where: journalFilterBuilder({ filter: args.filter, userId, admin, requireAdmin: false }),
		_count: true
	});

	const sum = await prisma.journalEntry.aggregate({
		where: journalFilterBuilder({ filter: args.filter, userId, admin, requireAdmin: false }),
		orderBy: journalEntrySortBuilder(args.sort),
		skip: offset + limit,
		_sum: {
			amount: true
		}
	});

	return { journalEntries, count: count._count, sum: sum._sum.amount ? sum._sum.amount : 0 };
};
