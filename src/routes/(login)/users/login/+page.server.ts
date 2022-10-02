import { checkAUserExists } from '$lib/server/auth/checkAUserExists';
import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const userExists = await checkAUserExists();

	//Checks if there is at least one user in the database
	//If not then redirects to firstUser page.
	if (!userExists) {
		console.log('Redirecting');
		throw redirect(302, '/users/firstUser');
	}

	return {};
};
