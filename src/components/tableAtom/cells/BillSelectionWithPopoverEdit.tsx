import { Group, Popover, Text } from "@mantine/core";

import {
  BillSelection,
  type BillSelectionProps
} from "src/components/bill/BillSelection";
import { trpc } from "src/utils/trpc";

import { PopoverLinkButton } from "./PopoverLinkButton";

export const BillSelectionWithPopoverEdit = (
  props: BillSelectionProps & { editing: boolean }
) => {
  const { data: billInfo } = trpc.bills.get.useQuery({
    filters: [{ id: { in: props.value ? [props.value] : [] } }]
  });
  const { editing, ...otherProps } = props;

  if (editing) {
    return <BillSelection {...otherProps} />;
  }

  return (
    <Popover trapFocus>
      <Popover.Target>
        <Text>
          {billInfo?.data && billInfo.data[0] ? billInfo.data[0].title : ""}
        </Text>
      </Popover.Target>
      <Popover.Dropdown>
        <Group>
          <BillSelection {...otherProps} />
          <PopoverLinkButton url={`/summary/bills/${props.value}`} />
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};
