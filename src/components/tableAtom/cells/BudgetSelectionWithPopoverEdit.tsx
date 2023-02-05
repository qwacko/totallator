import { Popover, Text } from "@mantine/core";

import {
  BudgetSelection,
  type BudgetSelectionProps
} from "src/components/budget/BudgetSelection";
import { trpc } from "src/utils/trpc";

export const BudgetSelectionWithPopoverEdit = (
  props: BudgetSelectionProps & { editing: boolean }
) => {
  const { data: budgetInfo } = trpc.budgets.get.useQuery({
    filters: [{ id: { in: props.value ? [props.value] : [] } }]
  });
  const { editing, ...otherProps } = props;

  if (editing) {
    return <BudgetSelection {...otherProps} />;
  }

  return (
    <Popover trapFocus>
      <Popover.Target>
        <Text>
          {budgetInfo?.data && budgetInfo.data[0]
            ? budgetInfo.data[0].title
            : ""}
        </Text>
      </Popover.Target>
      <Popover.Dropdown>
        <BudgetSelection {...otherProps} />
      </Popover.Dropdown>
    </Popover>
  );
};
