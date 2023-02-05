import {
  MultiSelect,
  type MultiSelectProps,
  Select,
  type SelectProps
} from "@mantine/core";

import { trpc } from "src/utils/trpc";

const useBillsDropdown = ({
  accountGroupingId,
  includeOnlyAdmin
}: {
  accountGroupingId?: string;
  includeOnlyAdmin?: boolean;
}) => {
  const { data: bills } = trpc.bills.getDropdown.useQuery({
    accountGroupingId,
    includeOnlyAdmin
  });

  return bills || [];
};

export type BillSelectionProps = Omit<SelectProps, "data"> & {
  accountGroupingId?: string;
  includeOnlyAdmin?: boolean;
};

export const BillSelection = ({
  accountGroupingId,
  includeOnlyAdmin,
  ...props
}: BillSelectionProps) => {
  const filteredBills = useBillsDropdown({
    accountGroupingId,
    includeOnlyAdmin
  });

  return <Select {...props} data={filteredBills} />;
};

export const BillMultiSelection = ({
  accountGroupingId,
  includeOnlyAdmin,
  ...props
}: Omit<MultiSelectProps, "data"> & {
  accountGroupingId?: string;
  includeOnlyAdmin?: boolean;
}) => {
  const filteredBills = useBillsDropdown({
    accountGroupingId,
    includeOnlyAdmin
  });

  return <MultiSelect {...props} data={filteredBills} />;
};
