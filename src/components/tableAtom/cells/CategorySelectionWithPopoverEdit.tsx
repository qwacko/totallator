import { Popover, Text } from "@mantine/core";

import {
  CategorySelection,
  type CategorySelectionProps
} from "src/components/category/CategorySelection";

export const CategorySelectionWithPopoverEdit = (
  props: CategorySelectionProps & { editing: boolean; title: string }
) => {
  const { editing, title, ...otherProps } = props;

  if (editing) {
    return <CategorySelection {...otherProps} />;
  }

  return (
    <Popover trapFocus>
      <Popover.Target>
        <Text>{title}</Text>
      </Popover.Target>
      <Popover.Dropdown>
        <CategorySelection {...otherProps} />
      </Popover.Dropdown>
    </Popover>
  );
};
