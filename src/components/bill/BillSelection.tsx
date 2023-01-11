import {
  MultiSelect,
  type MultiSelectProps,
  Select,
  type SelectProps
} from "@mantine/core";
import { useMemo } from "react";

import { useBills } from "src/utils/hooks/bills/useBills";

const useBillsDropdown = ({
  accountGroupingId
}: {
  accountGroupingId?: string;
}) => {
  const bills = useBills();
  const filteredBills = useMemo(
    () =>
      bills.data
        ? bills.data
            .filter((item) =>
              accountGroupingId
                ? item.accountGroupingId === accountGroupingId
                : true
            )
            .map((item) => ({
              label: item.title,
              value: item.id
            }))
        : [],
    [bills.data, accountGroupingId]
  );

  return filteredBills;
};

export const BillSelection = ({
  accountGroupingId,
  ...props
}: Omit<SelectProps, "data"> & {
  accountGroupingId?: string;
}) => {
  const filteredBills = useBillsDropdown({ accountGroupingId });

  return <Select {...props} data={filteredBills} />;
};

export const BillMultiSelection = ({
  accountGroupingId,
  ...props
}: Omit<MultiSelectProps, "data"> & {
  accountGroupingId?: string;
}) => {
  const filteredBills = useBillsDropdown({ accountGroupingId });

  return <MultiSelect {...props} data={filteredBills} />;
};
