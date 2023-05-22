import { userRouter } from './routers/user';
import { t } from './t';

export const router = t.router({
	users: userRouter
});

export type Router = typeof router;
export type CalledRouter = ReturnType<Router['createCaller']>;
