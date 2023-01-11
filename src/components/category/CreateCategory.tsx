import { Button, Group, Modal, Select, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons";

import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";
import { useCreateCategory } from "src/utils/hooks/categories/useCreateCategory";

import { CategoryGroupSelection } from "./CategoryGroupSelection";
import { CategorySingleSelection } from "./CategorySingleSelection";

export const CreateCategoryForm = ({ onClose }: { onClose?: () => void }) => {
  const { data: accountGroupings } = useAccountGroupings();

  const createCategory = useCreateCategory({
    onMutate: () => {
      onClose && onClose();
    }
  });

  const enable = Boolean(createCategory.form.values["accountGroupingId"]);

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
                  label: ag.title
                }))
              : []
          }
          {...createCategory.form.getInputProps("accountGroupingId")}
        />
        <CategoryGroupSelection
          {...createCategory.form.getInputProps("group")}
          required
          label="Group"
          accountGroupingId={createCategory.form.values["accountGroupingId"]}
          disabled={!enable}
        />
        <CategorySingleSelection
          {...createCategory.form.getInputProps("single")}
          required
          label="Single"
          accountGroupingId={createCategory.form.values["accountGroupingId"]}
          disabled={!enable}
        />

        <Group position="right">
          <Button type="submit" disabled={!enable}>
            Create
          </Button>
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
