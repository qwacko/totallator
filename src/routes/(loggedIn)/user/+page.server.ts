import { logging } from '$lib/server/logging.js';

export const load = async (event) => {
	if (event.locals.userId) {
		const user = await event.locals.trpc.users.getUserInfo(event.locals.userId);
		logging.info('user', user);
		return { user };
	}
	return { user: undefined };
};

export const actions = {
	logout: async (event) => {
		event.locals.auth.setSession(null);
	}
};
