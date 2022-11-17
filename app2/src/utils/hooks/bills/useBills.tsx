import { trpc } from "src/utils/trpc";

export const useBills = () => {
  const { data: allBills, isLoading } = trpc.bills.get.useQuery();

  return { allBills, isLoading };
};
