import { Popover, Text } from "@mantine/core";

import {
  TagSelection,
  type TagSelectionProps
} from "src/components/tag/TagSelection";

export const TagSelectionWithPopoverEdit = (
  props: TagSelectionProps & { editing: boolean; title: string }
) => {
  const { editing, title, ...otherProps } = props;

  if (editing) {
    return <TagSelection {...otherProps} />;
  }

  return (
    <Popover trapFocus>
      <Popover.Target>
        <Text>{title}</Text>
      </Popover.Target>
      <Popover.Dropdown>
        <TagSelection {...otherProps} />
      </Popover.Dropdown>
    </Popover>
  );
};
