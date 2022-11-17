import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { router } from "../trpc";
import { accountGroupingRouter } from "./accountGroupings";
import { userRouter } from "./user";

export const appRouter = router({
  user: userRouter,
  accountGroupings: accountGroupingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type AppRouterOutputs = inferRouterOutputs<AppRouter>;
export type AppRouterInputs = inferRouterInputs<AppRouter>;
