import { env } from '$env/dynamic/private';

export const envVariables = {
	allowSignup: String(env.ALLOW_SIGNUP).toLowerCase() === 'true',
	allowHTTP: String(env.ALLOW_HTTP).toLowerCase() === 'true',
	authSecret: String(env.AUTH_SECRET)
};
