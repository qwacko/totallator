import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import { router } from '../trpc';
import { accountGroupingRouter } from './accountGroupings';
import { accountRouter } from './accounts';
import { billRouter } from './bills';
import { budgetRouter } from './budgets';
import { categoryRouter } from './categories';
import { journalsRouter } from './journalEntries';
import { summaryRouter } from './summary';
import { tagRouter } from './tags';
import { userRouter } from './user';

export const appRouter = router({
	user: userRouter,
	accountGroupings: accountGroupingRouter,
	bills: billRouter,
	budgets: budgetRouter,
	tags: tagRouter,
	categories: categoryRouter,
	accounts: accountRouter,
	journals: journalsRouter,
	summary: summaryRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type AppRouterOutputs = inferRouterOutputs<AppRouter>;
export type AppRouterInputs = inferRouterInputs<AppRouter>;

//Key Return Types
export type AccountsReturnType = AppRouterOutputs['accounts']['get']['data'][0];
export type BillsReturnType = AppRouterOutputs['bills']['get']['data'][0];
export type BudgetsReturnType = AppRouterOutputs['budgets']['get']['data'][0];
export type CategoriesReturnType = AppRouterOutputs['categories']['get']['data'][0];
export type TagsReturnType = AppRouterOutputs['tags']['get']['data'][0];
export type JournalsReturnType = AppRouterOutputs['journals']['get']['data'][0];
