import { Button, Group, Modal, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons";

import { useCreateTag } from "src/utils/hooks/tags/useCreateTag";

import { AccountGroupingSelection } from "../accountGrouping/AccountGroupingSelection";
import { TagGroupSelection } from "./TagGroupSelection";
import { TagSingleSelection } from "./TagSingleSelection";

const CreateTagForm = ({ onClose }: { onClose?: () => void }) => {
  const createTag = useCreateTag({
    onMutate: () => {
      onClose && onClose();
    }
  });

  const enable = Boolean(createTag.form.values["accountGroupingId"]);

  return (
    <form
      onSubmit={createTag.form.onSubmit((values) =>
        createTag.mutate.mutate(values)
      )}
    >
      <Stack>
        <AccountGroupingSelection
          label="Account Grouping"
          required
          clearable
          {...createTag.form.getInputProps("accountGroupingId")}
        />
        <TagGroupSelection
          {...createTag.form.getInputProps("group")}
          required
          label="Group"
          accountGroupingId={createTag.form.values["accountGroupingId"]}
          disabled={!enable}
        />
        <TagSingleSelection
          {...createTag.form.getInputProps("single")}
          required
          label="Single"
          accountGroupingId={createTag.form.values["accountGroupingId"]}
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
