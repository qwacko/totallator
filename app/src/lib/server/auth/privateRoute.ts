import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { auth } from '$lib/server/auth/lucia';
import { redirect } from '@sveltejs/kit';

export const privateRoute = async (session: App.Session) => {
	if (!session.lucia) {
		return {
			status: 302,
			redirect: '/users/login'
		};
	}
	return {};
};

export const privateRouteLocals = async (locals: App.Locals) => {
	if (!locals.lucia) {
		throw redirect(300, '/users/login');
	}
	return {};
};

export const loggedOutRoute = async (session: App.Session) => {
	if (session.lucia) {
		if (browser) {
			goto('/');
			return {};
		} else {
			return {
				status: 302,
				redirect: '/'
			};
		}
	}
	return {};
};

export const loggedOutRouteLocals = async (request: Request) => {
	const session = await auth.validateRequestByCookie(request);
	if (session?.user) {
		console.log('Redirecting as logged in');
		throw redirect(302, '/');
	}

	return {};
};
