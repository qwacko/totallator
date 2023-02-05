import {
  MultiSelect,
  type MultiSelectProps,
  Select,
  type SelectProps
} from "@mantine/core";

import { trpc } from "src/utils/trpc";

const useBudgetsDropdown = ({
  accountGroupingId,
  includeOnlyAdmin
}: {
  accountGroupingId?: string;
  includeOnlyAdmin?: boolean;
}) => {
  const { data } = trpc.budgets.getDropdown.useQuery({
    accountGroupingId,
    includeOnlyAdmin
  });

  return data || [];
};

export type BudgetSelectionProps = Omit<SelectProps, "data"> & {
  accountGroupingId?: string;
  includeOnlyAdmin?: boolean;
};

export const BudgetSelection = ({
  accountGroupingId,
  includeOnlyAdmin,
  ...props
}: BudgetSelectionProps) => {
  const filteredBills = useBudgetsDropdown({
    accountGroupingId,
    includeOnlyAdmin
  });

  return <Select {...props} data={filteredBills} />;
};

export const BudgetMultiSelection = ({
  accountGroupingId,
  includeOnlyAdmin,
  ...props
}: Omit<MultiSelectProps, "data"> & {
  accountGroupingId?: string;
  includeOnlyAdmin?: boolean;
}) => {
  const filteredBills = useBudgetsDropdown({
    accountGroupingId,
    includeOnlyAdmin
  });

  return <MultiSelect {...props} data={filteredBills} />;
};
