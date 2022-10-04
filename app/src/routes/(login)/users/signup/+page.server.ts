import { checkAUserExists } from '$lib/server/auth/checkAUserExists';
import { envVariables } from '$lib/server/utils/variables';
import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	if (!envVariables.allowSignup) {
		throw redirect(302, '/users/login');
	}
	const userExists = await checkAUserExists();

	//Checks if there is at least one user in the database
	//If not then redirects to firstUser page.
	if (!userExists) {
		throw redirect(302, '/users/firstUser');
	}

	return {};
};
