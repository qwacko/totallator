import type { YogaInitialContext } from '@graphql-yoga/common';
import type { ServerSession } from 'lucia-sveltekit/types';

export interface GraphqlContext extends YogaInitialContext {
	locals: App.Locals;
	user?: ServerSession;
}
