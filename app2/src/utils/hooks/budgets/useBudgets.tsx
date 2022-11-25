import { trpc } from "src/utils/trpc";

export const useBudgets = () => {
  const data = trpc.budgets.get.useQuery();
  return data;
};
