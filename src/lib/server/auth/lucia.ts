import { dev } from '$app/environment';
import client from '$lib/server/prisma/client';
import prisma from '@lucia-sveltekit/adapter-prisma';
import lucia from 'lucia-sveltekit';

import { envVariables } from '../utils/variables';

export const auth = lucia({
	adapter: prisma(client),
	secret: envVariables.authSecret,
	env: dev || envVariables.allowHTTP ? 'DEV' : 'PROD'
});
