import { type SelectProps, Text } from "@mantine/core";

import { AccountSelect } from "src/components/account/AccountSelect";

import { PopoverEdit } from "./PopoverEdit";

export const AccountTypeSelectionWithPopoverEdit = (
  props: Omit<SelectProps, "data"> & { editing: boolean }
) => {
  const { editing, ...otherProps } = props;

  return (
    <PopoverEdit displayValue={<Text>{props.value}</Text>} editing={editing}>
      <AccountSelect {...otherProps} />
    </PopoverEdit>
  );
};
