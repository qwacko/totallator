import { trpc } from "src/utils/trpc";

export const useAccountGroupings = () => {
  const { data, isLoading, refetch } = trpc.accountGroupings.get.useQuery();

  return {
    data,
    isLoading,
  };
};
