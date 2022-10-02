import { authCheckPrisma } from '$lib/server/auth/authCheck';
import {
	type AccountGroupingModel,
	accountGroupingInclude
} from '$lib/server/graphqlServer/types/models';
import type { GraphqlMutationResolvers } from '$lib/server/graphqlServer/types/resolvers';
import prisma from '$lib/server/prisma/client';
import { GraphQLYogaError } from '@graphql-yoga/common';

import { basicStatusToDB, basicStatusToDBRequired } from '../helpers/general/basicStatusToDB';

export const createAccountGrouping: GraphqlMutationResolvers['createAccountGrouping'] = async (
	_,
	args,
	context
): Promise<AccountGroupingModel> => {
	const { userId } = authCheckPrisma(context);

	const newAccountGrouping = await prisma.accountGrouping.create({
		data: {
			title: args.input.title,
			adminUsers: { connect: { id: userId } },
			viewUsers: { connect: { id: userId } },
			...basicStatusToDBRequired('Active')
		},
		include: accountGroupingInclude
	});

	return newAccountGrouping;
};

export const updateAccountGrouping: GraphqlMutationResolvers['updateAccountGrouping'] = async (
	_,
	args,
	context
): Promise<AccountGroupingModel> => {
	const { userId, admin } = authCheckPrisma(context);

	const updatedAGCount = await prisma.accountGrouping.updateMany({
		where: { id: args.id, ...(admin ? {} : { adminUsers: { some: { id: userId } } }) },
		data: {
			title: args?.input?.title ? args.input.title : undefined,
			...basicStatusToDB(args?.input?.status)
		}
	});

	if (updatedAGCount.count === 0) {
		throw new GraphQLYogaError('No Account Groupings Updated');
	}

	const updatedAG = await prisma.accountGrouping.findMany({
		where: { id: args.id, ...(admin ? {} : { adminUsers: { some: { id: userId } } }) },
		include: accountGroupingInclude
	});

	return updatedAG[0];
};

const checkCanEditAccountGrouping = async ({
	agId,
	userId,
	requires2Admin = false,
	admin
}: {
	agId: string;
	userId: string;
	requires2Admin?: boolean;
	admin: boolean;
}) => {
	const checkedAccountGrouping = await prisma.accountGrouping.findMany({
		where: { id: agId, ...(admin ? {} : { adminUsers: { some: { id: userId } } }) },
		select: { id: true, adminUsers: { select: { id: true } } }
	});
	//Make sure user can modify the chosen account grouping
	if (checkedAccountGrouping.length === 0) {
		throw new GraphQLYogaError('Cannot Find or Modify Account Group');
	}
	if (requires2Admin) {
		const twoOrMoreAdmin = checkedAccountGrouping.filter((item) => item.adminUsers.length > 1);
		if (twoOrMoreAdmin.length === 0) {
			throw new GraphQLYogaError('Cannot Remove Last Admin User');
		}
	}
};

export const addUserToAccountGrouping: GraphqlMutationResolvers['addUserToAccountGrouping'] =
	async (_, args, context): Promise<AccountGroupingModel> => {
		const { userId, admin } = authCheckPrisma(context);
		const agId = args.id;
		const userEmail = args.email;

		await checkCanEditAccountGrouping({ agId, userId, admin });

		return prisma.accountGrouping.update({
			where: { id: agId },
			data: { viewUsers: { connect: { email: userEmail } } },
			include: accountGroupingInclude
		});
	};

export const removeUserFromAccountGrouping: GraphqlMutationResolvers['removeUserFromAccountGrouping'] =
	async (_, args, context): Promise<AccountGroupingModel> => {
		const { userId, admin } = authCheckPrisma(context);
		const agId = args.agID;
		const userID = args.userID;

		await checkCanEditAccountGrouping({ agId, userId, admin, requires2Admin: true });

		return prisma.accountGrouping.update({
			where: { id: agId },
			data: {
				viewUsers: { disconnect: { id: userID } },
				adminUsers: { disconnect: { id: userID } }
			},
			include: accountGroupingInclude
		});
	};

export const setUserToAGAdmin: GraphqlMutationResolvers['setUserToAGAdmin'] = async (
	_,
	args,
	context
): Promise<AccountGroupingModel> => {
	const { userId, admin } = authCheckPrisma(context);
	const agId = args.agID;
	const targetUserID = args.userID;

	await checkCanEditAccountGrouping({ agId, userId, admin, requires2Admin: false });

	return prisma.accountGrouping.update({
		where: { id: agId },
		data: {
			viewUsers: { connect: { id: targetUserID } },
			adminUsers: { connect: { id: targetUserID } }
		},
		include: accountGroupingInclude
	});
};

export const setUserToAGView: GraphqlMutationResolvers['setUserToAGView'] = async (
	_,
	args,
	context
): Promise<AccountGroupingModel> => {
	const { userId, admin } = authCheckPrisma(context);
	const agId = args.agID;
	const targetUserId = args.userID;

	await checkCanEditAccountGrouping({ agId, userId, admin, requires2Admin: true });

	return prisma.accountGrouping.update({
		where: { id: agId },
		data: {
			viewUsers: { connect: { id: targetUserId } },
			adminUsers: { disconnect: { id: targetUserId } }
		},
		include: accountGroupingInclude
	});
};
