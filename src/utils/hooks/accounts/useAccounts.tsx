import { useMemo } from "react";

import { trpc } from "src/utils/trpc";

import { useAllAccountStats } from "./useAccountStats";

export const useAccounts = () => {
  const statsData = useAllAccountStats();
  const data = trpc.accounts.getDropdown.useQuery();

  const combinedData = useMemo(() => {
    if (data.data && statsData) {
      return data.data.map((account) => {
        const matchingStats = statsData.find(
          (item) => item.accountId === account.id
        );
        return {
          ...account,
          sum: matchingStats?._sum ? matchingStats._sum.amount : undefined
        };
      });
    }
    return [];
  }, [data.data, statsData]);

  return { ...data, combinedData };
};
