import { Button, Group, Modal, Stack, TextInput } from "@mantine/core";

import { useAddUserToAG } from "src/utils/hooks/accountGroupings/useAddUserTOAG";

import type { AccountGroupingReturnSingle } from "./AccountGroupingCard";

export const AccountGroupingAddUserForm = ({
  accountGroupingId,
  onSuccess
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
  data,
  opened,
  close
}: {
  data: AccountGroupingReturnSingle;
  opened: boolean;
  close: () => void;
}) => {
  return (
    <Modal title={`Add User To ${data.title}`} opened={opened} onClose={close}>
      <AccountGroupingAddUserForm
        accountGroupingId={data.title}
        onSuccess={close}
      />
    </Modal>
  );
};
