import { Button, Group, Modal, Select, Stack, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons";

import { useCreateBill } from "src/utils/hooks/bills/useCreateBill";

import { AccountGroupingSelection } from "../accountGrouping/AccountGroupingSelection";

const CreateBillForm = ({ onClose }: { onClose?: () => void }) => {
  const createBill = useCreateBill({
    onMutate: () => {
      onClose && onClose();
    }
  });

  return (
    <form
      onSubmit={createBill.form.onSubmit((values) =>
        createBill.mutate.mutate(values)
      )}
    >
      <Stack>
        <AccountGroupingSelection
          label="Account Grouping"
          required
          clearable
          {...createBill.form.getInputProps("accountGroupingId")}
        />
        <TextInput
          {...createBill.form.getInputProps("title")}
          required
          label="Title"
        />

        <Group position="right">
          <Button type="submit">Create</Button>
        </Group>
      </Stack>
    </form>
  );
};

export const CreateBillPopup = () => {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open} size="sm" compact variant="light">
        <IconPlus size={15} />
      </Button>
      <Modal opened={opened} onClose={close} title="Create Bill">
        <CreateBillForm onClose={close} />
      </Modal>
    </>
  );
};
