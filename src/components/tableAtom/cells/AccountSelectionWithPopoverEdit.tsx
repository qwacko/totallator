import { Popover, Text } from "@mantine/core";

import {
  AccountSelection,
  type AccountSelectionProps
} from "src/components/account/AccountSelection";
import { trpc } from "src/utils/trpc";

export const AccountSelectionWithPopoverEdit = (
  props: AccountSelectionProps & { editing: boolean }
) => {
  const { data: accountInfo } = trpc.accounts.get.useQuery({
    filters: [{ id: { in: props.value ? [props.value] : [] } }]
  });
  const { editing, ...otherProps } = props;

  if (editing) {
    return <AccountSelection {...otherProps} />;
  }

  return (
    <Popover trapFocus>
      <Popover.Target>
        <Text>
          {accountInfo?.data && accountInfo.data[0]
            ? accountInfo.data[0].title
            : ""}
        </Text>
      </Popover.Target>
      <Popover.Dropdown>
        <AccountSelection {...otherProps} />
      </Popover.Dropdown>
    </Popover>
  );
};
