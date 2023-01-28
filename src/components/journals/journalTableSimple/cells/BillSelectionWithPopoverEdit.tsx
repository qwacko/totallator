import { Popover, Text } from "@mantine/core";

import {
  BillSelection,
  type BillSelectionProps
} from "src/components/bill/BillSelection";

export const BillSelectionWithPopoverEdit = (
  props: BillSelectionProps & { editing: boolean; title: string }
) => {
  const { editing, title, ...otherProps } = props;

  if (editing) {
    return <BillSelection {...otherProps} />;
  }

  return (
    <Popover trapFocus>
      <Popover.Target>
        <Text>{title}</Text>
      </Popover.Target>
      <Popover.Dropdown>
        <BillSelection {...otherProps} />
      </Popover.Dropdown>
    </Popover>
  );
};
