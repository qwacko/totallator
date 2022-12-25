import { Button, Group, Modal, Stack, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons";
import { useAddUserToAG } from "src/utils/hooks/accountGroupings/useAddUserTOAG";

export const AccountGroupingAddUserForm = ({
  accountGroupingId,
  onSuccess,
}: {
  accountGroupingId: string;
  onSuccess: () => void;
}) => {
  const { form, mutate, isLoading } = useAddUserToAG({ onSuccess });

  return (
    <form
      onSubmit={form.onSubmit((data) =>
        mutate({ username: data.username, accountGroupingId })
      )}
    >
      <Stack>
        <TextInput {...form.getInputProps("username")} label="Username" />
        <Group>
          <Button type="submit" loading={isLoading}>
            Add User
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export const AccountGroupingAddUserPopup = ({
  accountGroupingId,
  title,
}: {
  accountGroupingId: string;
  title: string;
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open} compact variant="light">
        <Group spacing={2}>
          <IconPlus size={15} />
          <Text size="xs">Add User</Text>
        </Group>
      </Button>
      <Modal title={`Add User To ${title}`} opened={opened} onClose={close}>
        <AccountGroupingAddUserForm
          accountGroupingId={accountGroupingId}
          onSuccess={close}
        />
      </Modal>
    </>
  );
};
