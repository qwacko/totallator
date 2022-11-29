import { Select, type SelectProps } from "@mantine/core";
import { useMemo } from "react";
import { useAccounts } from "src/utils/hooks/accounts/useAccounts";

export const AccountSelection = ({
  accountGroupingId,
  showAccountGroup = false,
  ...props
}: Omit<SelectProps, "data"> & {
  accountGroupingId: string;
  showAccountGroup?: boolean;
}) => {
  const accounts = useAccounts();
  const filteredAccounts = useMemo(
    () =>
      accounts.data
        ? accounts.data
            .filter((item) => item.accountGroupingId === accountGroupingId)
            .map((item) => ({
              label: showAccountGroup
                ? item.accountTitleCombined || item.title
                : item.title,
              group:
                item.type === "Asset" || item.type === "Liability"
                  ? item.accountGroupCombined || undefined
                  : item.type,
              value: item.id,
            }))
        : [],
    [accounts.data, accountGroupingId, showAccountGroup]
  );

  return <Select {...props} data={filteredAccounts} />;
};
