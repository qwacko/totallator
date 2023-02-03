import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import type { BudgetsTableDataType } from "src/utils/hooks/budgets/useBudgetsTableData";
import { trpc } from "src/utils/trpc";

export const BudgetLoadData = ({
  config
}: {
  config: BudgetsTableDataType;
}) => {
  const setBudgetData = useSetAtom(config.data);
  const setPagination = useSetAtom(config.pagination);

  //Load The Data
  const queryConfig = useAtomValue(config.configForTRPC);
  const budgetData = trpc.budgets.get.useQuery(queryConfig);
  //Logic to pre-load the next and previous pages of data
  const queryConfigNext = useAtomValue(config.configForTRPCNext);
  const queryConfigPrev = useAtomValue(config.configForTRPCPrev);
  trpc.budgets.get.useQuery(queryConfigNext);
  trpc.budgets.get.useQuery(queryConfigPrev);

  useEffect(() => {
    if (budgetData.data) {
      setBudgetData(budgetData.data.data);
      setPagination((current) => ({
        ...current,
        rowCount: budgetData.data.count
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budgetData.data, setBudgetData, setPagination]);

  return <></>;
};
