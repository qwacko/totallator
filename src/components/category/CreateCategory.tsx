import { Button, Group, Modal, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons";

import { useCreateCategory } from "src/utils/hooks/categories/useCreateCategory";

import { AccountGroupingSelection } from "../accountGrouping/AccountGroupingSelection";
import { CategoryGroupSelection } from "./CategoryGroupSelection";
import { CategorySingleSelection } from "./CategorySingleSelection";

const CreateCategoryForm = ({ onClose }: { onClose?: () => void }) => {
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
        <AccountGroupingSelection
          label="Account Grouping"
          required
          clearable
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
