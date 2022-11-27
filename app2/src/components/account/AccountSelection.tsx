import { Select, type SelectProps } from "@mantine/core";
import { useMemo } from "react";
import { useAccounts } from "src/utils/hooks/accounts/useAccounts";

export const AccountSelection = ({
  accountGroupingId,
  ...props
}: SelectProps & {
  accountGroupingId: string;
}) => {
  const accounts = useAccounts();
  const filteredAccounts = useMemo(
    () =>
      accounts.data
        ? accounts.data
            .filter((item) => item.accountGroupingId === accountGroupingId)
            .map((item) => ({
              label: item.title,
              group: item.accountGroupCombined || undefined,
              value: item.id,
            }))
        : [],
    [accounts.data, accountGroupingId]
  );

  return <Select {...props} data={filteredAccounts} />;
};
