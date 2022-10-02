import prisma from '$lib/server/prisma/client';
import { GraphQLYogaError } from '@graphql-yoga/common';

type checkAGAccessType = {
	accountGroupingId: string;
	admin: boolean;
	userId: string;
	needsAdminAccess?: boolean;
};

export const checkAGAccessBool = async ({
	accountGroupingId,
	admin,
	userId,
	needsAdminAccess = true
}: checkAGAccessType) => {
	const checkAGQuery = await prisma.accountGrouping.aggregate({
		where: {
			id: accountGroupingId,
			...(admin
				? {}
				: needsAdminAccess
				? { adminUsers: { some: { id: userId } } }
				: { viewUsers: { some: { id: userId } } })
		},
		_count: true
	});

	return checkAGQuery._count !== 0;
};

export const checkAGAccess = async (input: checkAGAccessType) => {
	const canAccess = checkAGAccessBool(input);

	if (!canAccess) {
		throw new GraphQLYogaError(
			"User Doesn't have access to chosen account grouping or doesn't exist"
		);
	}
};
