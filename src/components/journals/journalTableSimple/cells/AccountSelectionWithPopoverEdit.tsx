import { Popover, Text } from "@mantine/core";

import {
  AccountSelection,
  type AccountSelectionProps
} from "src/components/account/AccountSelection";

export const AccountSelectionWithPopoverEdit = (
  props: AccountSelectionProps & { editing: boolean; title: string }
) => {
  const { editing, title, ...otherProps } = props;

  if (editing) {
    return <AccountSelection {...otherProps} />;
  }

  return (
    <Popover trapFocus>
      <Popover.Target>
        <Text>{title}</Text>
      </Popover.Target>
      <Popover.Dropdown>
        <AccountSelection {...otherProps} />
      </Popover.Dropdown>
    </Popover>
  );
};
