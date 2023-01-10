import { Modal, Button, Group, Stack, Text, List } from "@mantine/core";
import { useDeleteAccountGrouping } from "src/utils/hooks/accountGroupings/useDeleteAccountGrouping";
import type { AccountGroupingReturnSingle } from "./AccountGroupingCard";

export const AccountGroupingDeleteLinked = ({
  data,
  opened,
  close,
}: {
  data: AccountGroupingReturnSingle;
  opened: boolean;
  close: () => void;
}) => {
  const actions = useDeleteAccountGrouping({
    accountGroupingId: data.id,
    onMutate: () => close(),
  });

  return (
    <Modal opened={opened} onClose={close} title="Unlink Account Grouping?">
      <Stack>
        <Text>
          This will delete all the following from the account grouping &quot;
          {data.title}&quot;
        </Text>
        <List>
          <List.Item>Journal Entries</List.Item>
          <List.Item>Accounts</List.Item>
          <List.Item>Bills</List.Item>
          <List.Item>Budgets</List.Item>
          <List.Item>Categories</List.Item>
          <List.Item>Tag</List.Item>
        </List>
        <Text>And is irreversible. Are you sure?</Text>
        <Group position="apart">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button color="red" onClick={actions.clearLinked}>
            Delete Linked
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
