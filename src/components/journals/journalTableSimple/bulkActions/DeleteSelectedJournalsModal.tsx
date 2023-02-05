import { Button, Group, Modal } from "@mantine/core";
import { type PrimitiveAtom, useAtomValue } from "jotai";

import { useDeleteTransactions } from "src/utils/hooks/journals/useDeleteTransactions";

export const DeleteSelectedJournalsModal = ({
  opened,
  close,
  rows
}: {
  opened: boolean;
  close: () => void;
  rows: PrimitiveAtom<string[]>;
}) => {
  const ids = useAtomValue(rows);

  const { deleteTrans } = useDeleteTransactions({
    journalIds: ids,
    onSuccess: close
  });

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={`Delete ${ids.length} Transactions?`}
    >
      <Group position="apart">
        <Button variant="outline" onClick={close}>
          Cancel
        </Button>
        <Button color="red" onClick={deleteTrans}>
          Delete
        </Button>
      </Group>
    </Modal>
  );
};
