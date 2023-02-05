import { Popover, Text } from "@mantine/core";

import {
  CategorySelection,
  type CategorySelectionProps
} from "src/components/category/CategorySelection";
import { trpc } from "src/utils/trpc";

export const CategorySelectionWithPopoverEdit = (
  props: CategorySelectionProps & { editing: boolean }
) => {
  const { data: categoryInfo } = trpc.categories.get.useQuery({
    filters: [{ id: { in: props.value ? [props.value] : [] } }]
  });

  const { editing, ...otherProps } = props;

  if (editing) {
    return <CategorySelection {...otherProps} />;
  }

  return (
    <Popover trapFocus>
      <Popover.Target>
        <Text>
          {categoryInfo?.data && categoryInfo.data[0]
            ? categoryInfo.data[0].title
            : ""}
        </Text>
      </Popover.Target>
      <Popover.Dropdown>
        <CategorySelection {...otherProps} />
      </Popover.Dropdown>
    </Popover>
  );
};
