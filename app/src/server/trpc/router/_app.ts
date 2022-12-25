import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { router } from "../trpc";
import { accountGroupingRouter } from "./accountGroupings";
import { accountRouter } from "./accounts";
import { billRouter } from "./bills";
import { budgetRouter } from "./budgets";
import { categoryRouter } from "./categories";
import { journalsRouter } from "./journalEntries";
import { tagRouter } from "./tags";
import { userRouter } from "./user";

export const appRouter = router({
  user: userRouter,
  accountGroupings: accountGroupingRouter,
  bills: billRouter,
  budgets: budgetRouter,
  tags: tagRouter,
  categories: categoryRouter,
  accounts: accountRouter,
  journals: journalsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type AppRouterOutputs = inferRouterOutputs<AppRouter>;
export type AppRouterInputs = inferRouterInputs<AppRouter>;
export type AccountGroupingReturnType =
  AppRouterOutputs["accountGroupings"]["get"][0];

//Key Return Types
export type AccountsReturnType = AppRouterOutputs["accounts"]["get"][0];
export type BillsReturnType = AppRouterOutputs["bills"]["get"][0];
export type BudgetsReturnType = AppRouterOutputs["budgets"]["get"][0];
export type CategoriesReturnType = AppRouterOutputs["categories"]["get"][0];
export type TagsReturnType = AppRouterOutputs["tags"]["get"][0];
export type JournalsReturnType = AppRouterOutputs["journals"]["get"]["data"][0];

export type AllReturnTypes =
  | AccountsReturnType
  | BillsReturnType
  | BudgetsReturnType
  | CategoriesReturnType
  | TagsReturnType;
