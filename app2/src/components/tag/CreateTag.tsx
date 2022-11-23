import { Button, Group, Modal, Select, Stack, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useDisclosure } from "@mantine/hooks";
import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";
import { useCreateTag } from "src/utils/hooks/categories/useCreateTag";

export const CreateTagForm = ({ onClose }: { onClose?: () => void }) => {
  const { data: accountGroupings } = useAccountGroupings();

  const createTag = useCreateTag({
    onMutate: () => {
      onClose && onClose();
    },
  });

  return (
    <form
      onSubmit={createTag.form.onSubmit((values) =>
        createTag.mutate.mutate(values)
      )}
    >
      <Stack>
        <Select
          label="Account Grouping"
          required
          clearable
          data={
            accountGroupings
              ? accountGroupings.map((ag) => ({
                  value: ag.id,
                  label: ag.title,
                }))
              : []
          }
          {...createTag.form.getInputProps("accountGroupingId")}
        />
        <TextInput
          {...createTag.form.getInputProps("group")}
          required
          label="Group"
        />
        <TextInput
          {...createTag.form.getInputProps("single")}
          required
          label="Single"
        />

        <Group position="right">
          <Button type="submit">Create</Button>
        </Group>
      </Stack>
    </form>
  );
};

export const CreateTagPopup = () => {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open} size="sm" compact variant="light">
        <IconPlus size={15} />
      </Button>
      <Modal opened={opened} onClose={close} title="Create Tag">
        <CreateTagForm onClose={close} />
      </Modal>
    </>
  );
};
