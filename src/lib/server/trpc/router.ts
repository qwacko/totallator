import type { inferRouterOutputs } from '@trpc/server';
import { userRouter } from './routers/user';
import { t } from './t';
import { accountGroupingRouter } from './routers/accountGroupings';
import { accountRouter } from './routers/accounts';
import { billRouter } from './routers/bills';
import { budgetRouter } from './routers/budgets';
import { categoryRouter } from './routers/categories';
import { journalsRouter } from './routers/journalEntries';
import { tagRouter } from './routers/tags';

export const router = t.router({
	users: userRouter,
	accountGroupings: accountGroupingRouter,
	accounts: accountRouter,
	billss: billRouter,
	budgets: budgetRouter,
	tags: tagRouter,
	categories: categoryRouter,
	journals: journalsRouter
});

export type Router = typeof router;
export type RouterOutputs = inferRouterOutputs<Router>;
export type CalledRouter = ReturnType<Router['createCaller']>;
