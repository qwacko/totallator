export const envVariables = {
	allowSignup: String(import.meta.env.VITE_ALLOW_SIGNUP).toLowerCase() === 'true',
	allowHTTP: String(import.meta.env.VITE_ALLOW_HTTP).toLowerCase() === 'true',
	authSecret: String(import.meta.env.VITE_AUTH_SECRET)
};
