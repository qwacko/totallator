import { trpc } from "src/utils/trpc";

export const useBills = () => {
  const data = trpc.bills.get.useQuery();
  return data;
};
