import { Select, type SelectProps } from "@mantine/core";
import { useMemo } from "react";
import { useBills } from "src/utils/hooks/bills/useBills";

export const BillSelection = ({
  accountGroupingId,
  ...props
}: SelectProps & {
  accountGroupingId: string;
}) => {
  const bills = useBills();
  const filteredBills = useMemo(
    () =>
      bills.data
        ? bills.data
            .filter((item) => item.accountGroupingId === accountGroupingId)
            .map((item) => ({
              label: item.title,
              value: item.id,
            }))
        : [],
    [bills.data, accountGroupingId]
  );

  return <Select {...props} data={filteredBills} />;
};
