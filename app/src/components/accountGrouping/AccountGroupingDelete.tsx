import { Modal, Button, Group, Stack, Text, List } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash, IconUnlink } from "@tabler/icons";
import { useDeleteAccountGrouping } from "src/utils/hooks/accountGroupings/useDeleteAccountGrouping";

export const AccountGroupingDelete = ({
  accountGroupingId,
  title,
}: {
  accountGroupingId: string;
  title: string;
}) => {
  const [isOpen, { close, open }] = useDisclosure(false);
  const actions = useDeleteAccountGrouping({
    accountGroupingId,
    onMutate: () => close(),
  });

  if (actions.isLoading) {
    return <></>;
  }

  if (actions.canDelete) {
    return (
      <>
        <Button compact onClick={open} color="red" variant="outline">
          <IconTrash size={15} />
        </Button>
        <Modal opened={isOpen} onClose={close} title="Delete Account Grouping?">
          <Stack>
            <Text>Delete "{title}" Account Grouping?</Text>
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
      </>
    );
  }
  return (
    <>
      <Button compact onClick={open} color="red" variant="outline">
        <IconUnlink size={15} />
      </Button>
      <Modal opened={isOpen} onClose={close} title="Unlink Account Grouping?">
        <Stack>
          <Text>
            This will delete all the following from the account grouping "
            {title}""
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
    </>
  );
};
