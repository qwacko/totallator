import { auth } from '$lib/server/auth/lucia';
import { type ServerLoad, redirect } from '@sveltejs/kit';

export const load: ServerLoad = async ({ request }) => {
	let userExists = false;
	try {
		const session = await auth.validateRequestByCookie(request);
		if (session?.user) {
			userExists = true;
		}
	} catch {
		userExists = false;
	}

	if (userExists) {
		throw redirect(302, '/');
	}

	return {};
};
