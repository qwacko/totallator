import { Button, Group, Modal, Stack, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons";

import { useCreateBudget } from "src/utils/hooks/budgets/useCreateBudget";

import { AccountGroupingSelection } from "../accountGrouping/AccountGroupingSelection";

const CreateBudgetForm = ({ onClose }: { onClose?: () => void }) => {
  const createBudget = useCreateBudget({
    onMutate: () => {
      onClose && onClose();
    }
  });

  return (
    <form
      onSubmit={createBudget.form.onSubmit((values) =>
        createBudget.mutate.mutate(values)
      )}
    >
      <Stack>
        <AccountGroupingSelection
          label="Account Grouping"
          required
          clearable
          {...createBudget.form.getInputProps("accountGroupingId")}
        />
        <TextInput
          {...createBudget.form.getInputProps("title")}
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

export const CreateBudgetPopup = () => {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open} size="sm" compact variant="light">
        <IconPlus size={15} />
      </Button>
      <Modal opened={opened} onClose={close} title="Create Budget">
        <CreateBudgetForm onClose={close} />
      </Modal>
    </>
  );
};
