import type { inferRouterOutputs } from '@trpc/server';
import { userRouter } from './routers/user';
import { t } from './t';

export const router = t.router({
	users: userRouter
});

export type Router = typeof router;
export type RouterOutputs = inferRouterOutputs<Router>;
export type CalledRouter = ReturnType<Router['createCaller']>;
