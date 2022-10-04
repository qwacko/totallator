import type { User } from '@prisma/client';

/// <reference types="lucia-sveltekit" />
declare namespace Lucia {
	interface UserData extends Omit<User, 'id' | 'identifier_token' | 'hashed_password'> {
		d?: boolean;
	}
}

/// <reference types="@sveltejs/kit" />
declare namespace App {}
