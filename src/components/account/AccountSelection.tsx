import {
  MultiSelect,
  type MultiSelectProps,
  Select,
  type SelectProps
} from "@mantine/core";
import { useMemo } from "react";

import { useAccounts } from "src/utils/hooks/accounts/useAccounts";
import { useCreateAccount } from "src/utils/hooks/accounts/useCreateAccount";

export const useAccountsDropdown = ({
  accountGroupingId,
  showAccountGroup
}: {
  accountGroupingId?: string;
  showAccountGroup: boolean;
}) => {
  const accounts = useAccounts();
  const filteredAccounts = useMemo(
    () =>
      accounts.data
        ? accounts.data
            .filter((item) =>
              accountGroupingId
                ? item.accountGroupingId === accountGroupingId
                : true
            )
            .map((item) => ({
              label: showAccountGroup
                ? item.accountTitleCombined || item.title
                : item.title,
              group:
                item.type === "Asset" || item.type === "Liability"
                  ? item.accountGroupCombined || undefined
                  : item.type,
              value: item.id
            }))
            .sort((a, b) =>
              `${a.group}-${a.label}`.localeCompare(`${b.group}-${b.label}`)
            )
        : [],
    [accounts.data, accountGroupingId, showAccountGroup]
  );

  return { accounts, filteredAccounts };
};

export type AccountSelectionProps = Omit<SelectProps, "data"> & {
  accountGroupingId?: string;
  showAccountGroup?: boolean;
  createExpenseOption?: boolean;
  onCreateSuccess?: (newAccountId: string) => void;
};

export const AccountSelection = ({
  accountGroupingId,
  showAccountGroup = false,
  createExpenseOption = false,
  onCreateSuccess,
  ...props
}: AccountSelectionProps) => {
  const { filteredAccounts } = useAccountsDropdown({
    accountGroupingId,
    showAccountGroup
  });

  const { mutate } = useCreateAccount({
    onSuccess: (newAccount) => {
      onCreateSuccess && onCreateSuccess(newAccount.id);
    }
  });

  if (createExpenseOption) {
    return (
      <Select
        {...props}
        data={filteredAccounts}
        creatable
        getCreateLabel={(val) => (
          <>
            <i>Create Expense</i> {val}
          </>
        )}
        onCreate={(title) => {
          if (accountGroupingId) {
            mutate.mutate({
              accountGroupingId,
              title,
              type: "Expense"
            });
          }
          return undefined;
        }}
      />
    );
  }

  return <Select {...props} data={filteredAccounts} />;
};

export const AccountMultiSelection = ({
  accountGroupingId,
  showAccountGroup = false,
  ...props
}: Omit<MultiSelectProps, "data"> & {
  accountGroupingId?: string;
  showAccountGroup?: boolean;
}) => {
  const { filteredAccounts } = useAccountsDropdown({
    accountGroupingId,
    showAccountGroup
  });

  return <MultiSelect {...props} data={filteredAccounts} />;
};
