import type { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import type { Context } from '../context';

export const getUserId = async (user: Context['user']) => {
	if (!user) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'User Not Found'
		});
	}

	return user.userId;
};

export const getUserInfo = async (user: Context['user'], prismaClient: PrismaClient) => {
	const userFound = user;

	if (!userFound) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'User Not Found'
		});
	}

	const userId = userFound.userId;

	const returnUser = await prismaClient.authUser.findFirst({
		where: { id: userId }
	});

	if (!returnUser) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'User Not Found'
		});
	}

	return returnUser;
};

export type UserInfo = Awaited<ReturnType<typeof getUserInfo>>;
