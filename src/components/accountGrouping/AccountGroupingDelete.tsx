import { Button, Group, Modal, Stack, Text } from "@mantine/core";

import { useDeleteAccountGrouping } from "src/utils/hooks/accountGroupings/useDeleteAccountGrouping";

import type { AccountGroupingReturnSingle } from "./AccountGroupingCard";

export const AccountGroupingDelete = ({
  data,
  opened,
  close
}: {
  data: AccountGroupingReturnSingle;
  opened: boolean;
  close: () => void;
}) => {
  const actions = useDeleteAccountGrouping({
    accountGroupingId: data.id,
    onMutate: () => close()
  });

  if (actions.isLoading) {
    return <></>;
  }

  return (
    <Modal opened={opened} onClose={close} title="Delete Account Grouping?">
      <Stack>
        <Text>Delete &quot;{data.title}&quot; Account Grouping?</Text>
        <Group position="apart">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button color="red" onClick={actions.deleteAG}>
            Delete
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
