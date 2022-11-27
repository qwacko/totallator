import { Select, type SelectProps } from "@mantine/core";
import { useMemo } from "react";
import { useBudgets } from "src/utils/hooks/budgets/useBudgets";

export const BudgetSelection = ({
  accountGroupingId,
  ...props
}: SelectProps & {
  accountGroupingId: string;
}) => {
  const budgets = useBudgets();
  const filteredBudgets = useMemo(
    () =>
      budgets.data
        ? budgets.data
            .filter((item) => item.accountGroupingId === accountGroupingId)
            .map((item) => ({
              label: item.title,
              value: item.id,
            }))
        : [],
    [budgets.data, accountGroupingId]
  );

  return <Select {...props} data={filteredBudgets} />;
};
