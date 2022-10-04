import { auth } from '$lib/server/auth/lucia';

export const handle = auth.handleHooks();
