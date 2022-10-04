import { auth } from '$lib/server/auth/lucia';

export const load = auth.handleServerSession();
