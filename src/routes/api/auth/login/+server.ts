import { auth } from '$lib/server/auth/lucia';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { email, password } = await request.json();

	if (!email || !password) {
		return new Response(
			JSON.stringify({
				error: 'Missing Email or Password'
			}),
			{ status: 400 }
		);
	}
	try {
		const authenticateUser = await auth.authenticateUser('email', email.toLowerCase(), password);
		const headers = new Headers();
		authenticateUser.cookies.forEach((cookie) => headers.append('set-cookie', cookie));
		return new Response('', { status: 200, headers });
	} catch (e) {
		const errorReceived = e as Error;
		if (
			errorReceived.message === 'AUTH_INVALID_IDENTIFIER_TOKEN' ||
			errorReceived.message === 'AUTH_INVALID_PASSWORD'
		) {
			return new Response(
				JSON.stringify({
					error: 'Incorrect email or password'
				}),
				{ status: 400 }
			);
		}
		// database connection error
		return new Response(
			JSON.stringify({
				error: 'Unknown Error'
			}),
			{ status: 400 }
		);
	}
};
