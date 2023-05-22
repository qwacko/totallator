import type { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';

import type { RouterOutputs } from 'src/utils/trpc';
import { createUserValidation } from '$lib/validation/user/createUserValidation';
import { currencyFormatValidation } from '$lib/validation/user/currencyFormats';
import { dbDateFormatValidation } from '$lib/validation/user/dateFormats';
import { updatePasswordResolver } from '$lib/validation/user/updatePasswordValidation';
import { updateUserValidation } from '$lib/validation/user/updateUserValidation';

import { protectedProcedure, publicProcedure, router, unprotectedProcedure } from '../trpc';

const createUser = async (
	user: { username: string; name: string; password: string },
	prismaUse: PrismaClient,
	admin = false
) => {
	const hashedPassword = await bcrypt.hash(user.password, 10);

	const createdUser = await prismaUse.user.create({
		data: {
			username: user.username.toLowerCase(),
			name: user.name,
			passwordHash: hashedPassword,
			admin
		}
	});

	if (!createdUser) {
		throw new TRPCError({
			code: 'CONFLICT',
			message: 'User Not Created'
		});
	}

	return createdUser;
};

const firstUserExists = async (prisma: PrismaClient) => {
	const user = await prisma.user.findFirst();
	return Boolean(user);
};

export const userRouter = router({
	get: protectedProcedure.query(async ({ ctx }) => {
		const userId = ctx.session.user.id;
		const data = await ctx.prisma.user.findUnique({ where: { id: userId } });

		if (!data) {
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: 'User Not Found'
			});
		}

		return {
			id: data.id,
			name: data.name,
			username: data.username,
			admin: data.admin,
			darkMode: data.darkMode,
			firstMonthFY: data.firstMonthFY,
			currencyFormat: currencyFormatValidation.parse(data.currencyFormat || 'USD'),
			dateFormat: dbDateFormatValidation.parse(data.dateFormat || 'YYYYMMDD')
		};
	}),
	getSession: publicProcedure.query(({ ctx }) => {
		return ctx.session;
	}),
	firstUserExists: publicProcedure.query(async ({ ctx }) => {
		return firstUserExists(ctx.prisma);
	}),
	getCallbackURL: publicProcedure.query(() => process.env.NEXTAUTH_URL),
	createFirstUser: unprotectedProcedure
		.input(createUserValidation)
		.mutation(async ({ ctx, input }) => {
			const userExists = await ctx.prisma.user.findFirst();

			if (userExists) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'First User Already Exists'
				});
			}

			const result = await createUser(input, ctx.prisma, true);
			return { id: result.id };
		}),
	createUser: unprotectedProcedure.input(createUserValidation).mutation(async ({ ctx, input }) => {
		const firstUser = await firstUserExists(ctx.prisma);

		if (!firstUser) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: "Please use 'createFirstUser' to create first acount"
			});
		}

		const existingUser = await ctx.prisma.user.findUnique({
			where: { username: input.username.toLowerCase() }
		});
		if (existingUser) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Username Already Used'
			});
		}

		const result = await createUser(input, ctx.prisma, false);
		return { id: result.id };
	}),
	updateUser: protectedProcedure.input(updateUserValidation).mutation(async ({ ctx, input }) => {
		const userId = ctx.session.user.id;

		if (!userId) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'User Not Selected'
			});
		}

		await ctx.prisma.user.update({
			where: { id: userId },
			data: input
		});

		return true;
	}),
	updatePassword: protectedProcedure
		.input(updatePasswordResolver)
		.mutation(async ({ ctx, input }) => {
			if (!ctx.session?.user?.id) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'User Not Selected'
				});
			}

			const user = await ctx.prisma.user.findUnique({
				where: { id: ctx.session.user.id }
			});

			if (!user) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'User Not Found'
				});
			}

			const passwordMatch = await bcrypt.compare(input.currentPassword, user.passwordHash || '');

			if (!passwordMatch) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: "Current Password Doesn't Match"
				});
			}

			const hashedPassword = await bcrypt.hash(input.password, 10);

			await ctx.prisma.user.update({
				where: { id: ctx.session.user.id },
				data: { passwordHash: hashedPassword }
			});

			return true;
		})
});

export type UserReturn = RouterOutputs['user']['get'];
