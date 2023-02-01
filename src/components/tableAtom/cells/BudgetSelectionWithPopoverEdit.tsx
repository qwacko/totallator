import { Popover, Text } from "@mantine/core";

import {
  BudgetSelection,
  type BudgetSelectionProps
} from "src/components/budget/BudgetSelection";

export const BudgetSelectionWithPopoverEdit = (
  props: BudgetSelectionProps & { editing: boolean; title: string }
) => {
  const { editing, title, ...otherProps } = props;

  if (editing) {
    return <BudgetSelection {...otherProps} />;
  }

  return (
    <Popover trapFocus>
      <Popover.Target>
        <Text>{title}</Text>
      </Popover.Target>
      <Popover.Dropdown>
        <BudgetSelection {...otherProps} />
      </Popover.Dropdown>
    </Popover>
  );
};
