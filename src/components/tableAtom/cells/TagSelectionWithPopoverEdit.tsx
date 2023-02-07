import { Group, Popover, Text } from "@mantine/core";

import {
  TagSelection,
  type TagSelectionProps
} from "src/components/tag/TagSelection";
import { trpc } from "src/utils/trpc";

import { PopoverLinkButton } from "./PopoverLinkButton";

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
        <Group>
          <TagSelection {...otherProps} />
          <PopoverLinkButton url={`/summary/tags/${props.value}`} />
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};
