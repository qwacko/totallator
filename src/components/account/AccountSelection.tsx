import {
  MultiSelect,
  type MultiSelectProps,
  Select,
  type SelectProps
} from "@mantine/core";

import { useCreateAccount } from "src/utils/hooks/accounts/useCreateAccount";
import { trpc } from "src/utils/trpc";

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
  const { data: accounts } = trpc.accounts.getDropdown.useQuery({
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
        data={accounts || []}
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

  return <Select {...props} data={accounts || []} />;
};

export const AccountMultiSelection = ({
  accountGroupingId,
  showAccountGroup = false,
  ...props
}: Omit<MultiSelectProps, "data"> & {
  accountGroupingId?: string;
  showAccountGroup?: boolean;
}) => {
  const { data: accounts } = trpc.accounts.getDropdown.useQuery({
    accountGroupingId,
    showAccountGroup
  });

  return <MultiSelect {...props} data={accounts || []} />;
};
