import {
  MultiSelect,
  type MultiSelectProps,
  Select,
  type SelectProps,
} from "@mantine/core";
import { useMemo } from "react";
import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";

export const useAccountGroupingsDropdown = ({
  adminOnly = false,
}: {
  adminOnly?: boolean;
}) => {
  const accountGroupings = useAccountGroupings();
  const filteredAccountGroupings = useMemo(
    () =>
      accountGroupings.data
        ? accountGroupings.data
            .filter((item) => (adminOnly ? item.userIsAdmin : true))
            .map((item) => ({
              label: item.title,

              value: item.id,
            }))
        : [],
    [accountGroupings.data, adminOnly]
  );

  return filteredAccountGroupings;
};

export const AccountGroupingSelection = ({
  adminOnly = false,
  ...props
}: Omit<SelectProps, "data"> & { adminOnly?: boolean }) => {
  const accountGroupings = useAccountGroupingsDropdown({ adminOnly });

  return <Select {...props} data={accountGroupings} />;
};

export const AccountGroupingMultiSelection = ({
  adminOnly = false,
  ...props
}: Omit<MultiSelectProps, "data"> & { adminOnly?: boolean }) => {
  const accountGroupings = useAccountGroupingsDropdown({ adminOnly });

  return <MultiSelect {...props} data={accountGroupings} />;
};
