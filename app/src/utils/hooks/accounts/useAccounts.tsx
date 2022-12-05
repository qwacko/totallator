import { trpc } from "src/utils/trpc";

export const useAccounts = () => {
  const data = trpc.accounts.get.useQuery();
  return data;
};
