import { router } from "../trpc";
import { accountGroupingRouter } from "./accountGroupings";
import { userRouter } from "./user";

export const appRouter = router({
  user: userRouter,
  accountGrounpings: accountGroupingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
