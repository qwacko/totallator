import { Button, Group, Modal, Select, Stack, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useDisclosure } from "@mantine/hooks";
import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";
import { useCreateCategory } from "src/utils/hooks/categories/useCreateCategory";

export const CreateCategoryForm = ({ onClose }: { onClose?: () => void }) => {
  const { data: accountGroupings } = useAccountGroupings();

  const createCategory = useCreateCategory({
    onMutate: () => {
      onClose && onClose();
    },
  });

  return (
    <form
      onSubmit={createCategory.form.onSubmit((values) =>
        createCategory.mutate.mutate(values)
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
          {...createCategory.form.getInputProps("accountGroupingId")}
        />
        <TextInput
          {...createCategory.form.getInputProps("group")}
          required
          label="Group"
        />
        <TextInput
          {...createCategory.form.getInputProps("single")}
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

export const CreateCategoryPopup = () => {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open} size="sm" compact variant="light">
        <IconPlus size={15} />
      </Button>
      <Modal opened={opened} onClose={close} title="Create Category">
        <CreateCategoryForm onClose={close} />
      </Modal>
    </>
  );
};
