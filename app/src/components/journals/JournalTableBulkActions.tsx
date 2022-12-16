import { Button, Group, Menu, Modal, NumberInput, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowDown } from "@tabler/icons";
import { HeaderContext, Row } from "@tanstack/react-table";
import { useState } from "react";
import { useCloneTransactions } from "src/utils/hooks/journals/useCloneTransactions";
import { useDeleteTransactions } from "src/utils/hooks/journals/useDeleteTransactions";
import { useUpdateJournals } from "src/utils/hooks/journals/useUpdateJournal";
import { JournalsMergedType } from "src/utils/hooks/journals/useJournals";
import { SelectionColumnHeader } from "../table/selectionColumnHeader";

export const JournalTableBulkActions = <T extends unknown>(
  column: HeaderContext<JournalsMergedType, T>
) => {
  const [deleteOpened, deleteActions] = useDisclosure(false);
  const [cloneOpened, cloneActions] = useDisclosure(false);

  const selection = column.table.getSelectedRowModel().rows;
  const { mutate: updateJournals } = useUpdateJournals();
  const journalIds = selection.map((item) => item.id);

  return (
    <>
      <SelectionColumnHeader column={column}>
        <Menu>
          <Menu.Target>
            <Button compact>
              <IconArrowDown size={10} />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Bulk Modify {selection.length} Transactions</Menu.Label>
            <Menu.Item
              onClick={deleteActions.open}
              disabled={selection.length === 0}
              color="red"
            >
              Delete
            </Menu.Item>
            <Menu.Item
              onClick={cloneActions.open}
              disabled={selection.length === 0}
            >
              Clone
            </Menu.Item>
            <Menu.Item>Update</Menu.Item>
            <Menu.Divider />
            <Menu.Label>Bulk Update</Menu.Label>
            <Menu.Item
              onClick={() =>
                updateJournals({
                  data: { reconciled: true },
                  maxUpdated: journalIds.length,
                  filters: [{ id: { in: journalIds } }],
                })
              }
            >
              Mark Reconciled
            </Menu.Item>
            <Menu.Item
              onClick={() =>
                updateJournals({
                  data: { dataChecked: true },
                  maxUpdated: journalIds.length,
                  filters: [{ id: { in: journalIds } }],
                })
              }
            >
              Mark Data Checked
            </Menu.Item>
            <Menu.Item
              onClick={() =>
                updateJournals({
                  data: { complete: true },
                  maxUpdated: journalIds.length,
                  filters: [{ id: { in: journalIds } }],
                })
              }
            >
              Mark Complete
            </Menu.Item>
            <Menu.Item
              onClick={() =>
                updateJournals({
                  data: { complete: true, reconciled: true, dataChecked: true },
                  maxUpdated: journalIds.length,
                  filters: [{ id: { in: journalIds } }],
                })
              }
            >
              Mark Complete/Reconciled/Checked
            </Menu.Item>
            <Menu.Item
              onClick={() =>
                updateJournals({
                  data: { dataChecked: false, reconciled: false },
                  maxUpdated: journalIds.length,
                  filters: [{ id: { in: journalIds } }],
                })
              }
            >
              Clear Status
            </Menu.Item>
            <Menu.Item
              onClick={() =>
                updateJournals({
                  data: { complete: false },
                  maxUpdated: journalIds.length,
                  updateCompleteJournals: true,
                  filters: [{ id: { in: journalIds } }],
                })
              }
            >
              Mark Incomplete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </SelectionColumnHeader>
      {deleteOpened && (
        <DeleteModal
          opened={deleteOpened}
          close={deleteActions.close}
          rows={selection}
        />
      )}
      {cloneOpened && (
        <CloneModal
          opened={cloneOpened}
          close={cloneActions.close}
          rows={selection}
        />
      )}
    </>
  );
};

const DeleteModal = ({
  opened,
  close,
  rows,
}: {
  opened: boolean;
  close: () => void;
  rows: Row<JournalsMergedType>[];
}) => {
  const ids = rows.map((item) => {
    const rowData = item.original;
    return rowData.transactionId;
  });

  const { deleteTrans } = useDeleteTransactions({ ids, onSuccess: close });

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={`Delete ${rows.length} Transactions?`}
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

const CloneModal = ({
  opened,
  close,
  rows,
}: {
  opened: boolean;
  close: () => void;
  rows: Row<JournalsMergedType>[];
}) => {
  const ids = rows.map((item) => {
    const rowData = item.original;
    return rowData.transactionId;
  });

  const [count, setCount] = useState<number>(1);
  const { clone } = useCloneTransactions({ ids, onSuccess: close });

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={`Clone ${rows.length} Transactions?`}
    >
      <Stack>
        <NumberInput
          value={count}
          onChange={(e) => e && setCount(e.valueOf())}
          precision={0}
          label="Number Of Clones"
        />
        <Group position="apart">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button onClick={() => clone(count)}>Clone</Button>
        </Group>
      </Stack>
    </Modal>
  );
};
