import {
  MultiSelect,
  type MultiSelectProps,
  Select,
  type SelectProps
} from "@mantine/core";
import { useMemo } from "react";

import { useBudgets } from "src/utils/hooks/budgets/useBudgets";

const useBudgetsDropdown = ({
  accountGroupingId
}: {
  accountGroupingId?: string;
}) => {
  const budgets = useBudgets();
  const filteredBudgets = useMemo(
    () =>
      budgets.data
        ? budgets.data
            .filter((item) =>
              accountGroupingId
                ? item.accountGroupingId === accountGroupingId
                : true
            )
            .map((item) => ({
              label: item.title,
              value: item.id
            }))
            .sort((a, b) => a.label.localeCompare(b.label))
        : [],
    [budgets.data, accountGroupingId]
  );

  return filteredBudgets;
};

export type BudgetSelectionProps = Omit<SelectProps, "data"> & {
  accountGroupingId?: string;
};

export const BudgetSelection = ({
  accountGroupingId,
  ...props
}: BudgetSelectionProps) => {
  const filteredBills = useBudgetsDropdown({ accountGroupingId });

  return <Select {...props} data={filteredBills} />;
};

export const BudgetMultiSelection = ({
  accountGroupingId,
  ...props
}: Omit<MultiSelectProps, "data"> & {
  accountGroupingId?: string;
}) => {
  const filteredBills = useBudgetsDropdown({ accountGroupingId });

  return <MultiSelect {...props} data={filteredBills} />;
};
