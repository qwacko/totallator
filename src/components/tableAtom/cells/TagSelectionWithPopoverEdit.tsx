import { Popover, Text } from "@mantine/core";

import {
  TagSelection,
  type TagSelectionProps
} from "src/components/tag/TagSelection";
import { trpc } from "src/utils/trpc";

export const TagSelectionWithPopoverEdit = (
  props: TagSelectionProps & { editing: boolean }
) => {
  const { data: tagInfo } = trpc.tags.get.useQuery({
    filters: [{ id: { in: props.value ? [props.value] : [] } }]
  });
  const { editing, ...otherProps } = props;

  if (editing) {
    return <TagSelection {...otherProps} />;
  }

  return (
    <Popover trapFocus>
      <Popover.Target>
        <Text>
          {tagInfo?.data && tagInfo.data[0] ? tagInfo.data[0].title : ""}
        </Text>
      </Popover.Target>
      <Popover.Dropdown>
        <TagSelection {...otherProps} />
      </Popover.Dropdown>
    </Popover>
  );
};
