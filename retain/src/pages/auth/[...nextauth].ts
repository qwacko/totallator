// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { prisma } from '../../../server/db/client';

export const authOptions: NextAuthOptions = {
	pages: { signIn: '/user/signin' },
	// Include user.id on session
	callbacks: {
		session({ session, token }) {
			if (session.user && token.sub) {
				session.user.id = token.sub;
			}
			return session;
		}
	},
	// Configure one or more authentication providers
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt'
	},
	jwt: {},
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with.")
			name: 'Credentials',
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: {
					label: 'Username',
					type: 'text',
					placeholder: 'Username'
				},
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials) {
				//Must have credentials.
				if (!credentials) return null;

				const username = credentials.username.toLowerCase();

				const user = await prisma.user.findUnique({
					where: { username: username.toLowerCase() }
				});

				if (!user || !user.passwordHash) {
					return null;
				}

				const passwordMatch = await bcrypt.compare(credentials.password, user.passwordHash);

				if (!passwordMatch) {
					return null;
				}

				const userOut = {
					id: user.id,
					email: user.email,
					name: user.name,
					admin: user.admin,
					image: null
				};

				return userOut;
			}
		})
	]
};

export default NextAuth(authOptions);
