import { signupSchema } from '$lib/schema/signupSchema';
import { auth } from '$lib/server/lucia';
import { authMiddleware } from '../middleware/auth';
import { t } from '../t';
import { loginSchema } from '$lib/schema/loginSchema';
import { env } from '$env/dynamic/private';
import type { PrismaClient } from '@prisma/client';
import { createUser } from '../helpers/createUser';
import { removeUserSchema } from '$lib/schema/removeUserSchema';
import { updatePasswordSchema } from '$lib/schema/updatePasswordSchema';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { currencyFormatValidation } from '$lib/validation/user/currencyFormats';
import { dbDateFormatValidation } from '$lib/validation/user/dateFormats';
import type { RouterOutputs } from '../router';

const allowFirstUserCreation = async (prisma: PrismaClient) => {
	const userCount = await prisma.authUser.count();

	const allowSignup = env.ALLOW_SIGNUP === 'true' || false;
	return {
		userCountZero: userCount === 0,
		allowSignup: allowSignup
	};
};

export const userRouter = t.router({
	users: t.procedure.use(authMiddleware).query(async ({ ctx }) => {
		const users = await ctx.prisma.authUser.findMany({ orderBy: { username: 'asc' } });

		return users;
	}),
	firstUser: t.procedure.query(async ({ ctx }) => {
		return allowFirstUserCreation(ctx.prisma);
	}),
	removeUser: t.procedure
		.use(authMiddleware)
		.input(removeUserSchema)
		.mutation(async ({ ctx, input }) => {
			const userId = (await ctx.user)?.userId;
			if (!userId) {
				return { error: { message: 'Not logged in' } };
			}

			if (input.id === userId) {
				return { error: { message: 'Cannot remove yourself' } };
			}

			await auth.deleteUser(input.id);

			return {};
		}),
	createUser: t.procedure
		.use(authMiddleware)
		.input(signupSchema)
		.mutation(async ({ ctx, input }) => {
			return createUser({
				...input,
				localAuth: ctx.event.locals.auth,
				autoLogin: true,
				admin: false
			});
		}),
	createFirstUser: t.procedure.input(signupSchema).mutation(async ({ ctx, input }) => {
		const allowed = await allowFirstUserCreation(ctx.prisma);
		if (!allowed.userCountZero && !allowed.allowSignup) {
			return { error: { location: 'username' as const, message: 'Not First User' } };
		}

		return createUser({ ...input, localAuth: ctx.event.locals.auth, autoLogin: true, admin: true });
	}),
	login: t.procedure.input(loginSchema).query(async ({ ctx, input }) => {
		try {
			const key = await auth.useKey('username', input.username, input.password);
			const session = await auth.createSession(key.userId);
			ctx.event.locals.auth.setSession(session);
			return {};
		} catch {
			return { error: { message: 'Login Error' } };
		}
	}),
	updatePassword: t.procedure
		.use(authMiddleware)
		.input(updatePasswordSchema)
		.mutation(async ({ input }) => {
			if (input.password !== input.confirmPassword) {
				return {
					error: {
						location: 'confirmPassword' as const,
						message: "Passwords don't match"
					}
				};
			}

			const key = await auth.getAllUserKeys(input.id);
			const usernameKey = key.find((item) => item.providerId === 'username');
			if (usernameKey) {
				auth.updateKeyPassword('username', usernameKey.providerUserId, input.password);
			}
			return input;
		}),
	getUserInfo: t.procedure
		.use(authMiddleware)
		.input(z.string())
		.query(async ({ ctx, input }) => {
			const user = await ctx.prisma.authUser.findUnique({ where: { id: input } });

			if (!user) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'User Not Found'
				});
			}

			return {
				...user,
				currencyFormat: currencyFormatValidation.parse(user.currencyFormat || 'USD'),
				dateFormat: dbDateFormatValidation.parse(user.dateFormat || 'YYYYMMDD')
			};
		})
});

export type UserReturn = RouterOutputs['users']['getUserInfo'];
