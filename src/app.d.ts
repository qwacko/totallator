/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface Locals {
			auth: import('lucia-auth').AuthRequest;
			userId: string | undefined;
			trpc: import('$lib/server/trpc/router').CalledRouter;
		}
	}
}

/// <reference types="lucia-auth" />
declare namespace Lucia {
	type Auth = import('$lib/server/lucia').Auth;
	type UserAttributes = import('@prisma/client').AuthUser;
}

export {};
