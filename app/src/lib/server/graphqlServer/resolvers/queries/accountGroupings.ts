// export const users = () => {};
import { authCheckPrisma } from '$lib/server/auth/authCheck';
import {
	type AccountGroupingModel,
	accountGroupingInclude
} from '$lib/server/graphqlServer/types/models';
import type { GraphqlQueryResolvers } from '$lib/server/graphqlServer/types/resolvers';
import prisma from '$lib/server/prisma/client';
import { GraphQLYogaError } from '@graphql-yoga/common';

export const accountGroupings: GraphqlQueryResolvers['accountGroupings'] = async (
	_,
	__,
	context
): Promise<AccountGroupingModel[]> => {
	const { userId, admin } = authCheckPrisma(context);

	const accountGroupings = await prisma.accountGrouping.findMany({
		where: {
			...(admin ? {} : { viewUsers: { some: { id: userId } } })
		},
		orderBy: [{ title: 'asc' }],
		include: accountGroupingInclude
	});

	return accountGroupings;
};

export const accountGrouping: GraphqlQueryResolvers['accountGrouping'] = async (
	_,
	args,
	context
): Promise<AccountGroupingModel> => {
	const { userId } = authCheckPrisma(context);

	const accountGrouping = await prisma.accountGrouping.findMany({
		where: { id: args.id, viewUsers: { some: { id: userId } } },
		include: accountGroupingInclude
	});
	if (accountGrouping.length === 0) {
		throw new GraphQLYogaError('Account Grouping Not Found');
	}

	return accountGrouping[0];
};
