import {
  Button,
  Group,
  Menu,
  Modal,
  NumberInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowDown, IconMenu, IconMenu2 } from "@tabler/icons";
import { HeaderContext, Row } from "@tanstack/react-table";
import { useState } from "react";
import { useCloneTransactions } from "src/utils/hooks/journals/useCloneTransactions";
import { useDeleteTransactions } from "src/utils/hooks/journals/useDeleteTransactions";
import { useUpdateJournals } from "src/utils/hooks/journals/useUpdateJournal";
import { JournalsMergedType } from "src/utils/hooks/journals/useJournals";
import { SelectionColumnHeader } from "../table/selectionColumnHeader";
import { useForm, zodResolver } from "@mantine/form";
import {
  UpdateJournalDataInputType,
  updateJournalInputData,
} from "src/utils/validation/journalEntries/updateJournalValidation";
import { DatePicker } from "@mantine/dates";
import { AccountSelection } from "../account/AccountSelection";
import { InputCurrency } from "../reusable/InputCurrency";
import { CategorySelection } from "../category/CategorySelection";
import { TagSelection } from "../tag/TagSelection";
import { BillSelection } from "../bill/BillSelection";
import { BudgetSelection } from "../budget/BudgetSelection";

export const JournalTableBulkActions = <T extends unknown>(
  column: HeaderContext<JournalsMergedType, T>
) => {
  const [deleteOpened, deleteActions] = useDisclosure(false);
  const [cloneOpened, cloneActions] = useDisclosure(false);
  const [updateOpened, updateActions] = useDisclosure(false);

  const selection = column.table.getSelectedRowModel().rows;
  const { mutate: updateJournals } = useUpdateJournals();
  const journalIds = selection.map((item) => item.id);

  return (
    <>
      <SelectionColumnHeader column={column}>
        <Menu>
          <Menu.Target>
            <Button compact>
              <IconMenu2 size={15} />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Selection</Menu.Label>
            <Menu.Item
              closeMenuOnClick={false}
              onClick={() => {
                column.table.toggleAllRowsSelected(false);
                column.table.toggleAllPageRowsSelected(true);
              }}
            >
              Select All
            </Menu.Item>
            <Menu.Item
              closeMenuOnClick={false}
              onClick={() => {
                column.table.toggleAllRowsSelected(false);
                column.table.toggleAllPageRowsSelected(false);
              }}
            >
              Clear Selection
            </Menu.Item>
            <Menu.Divider />
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
            <Menu.Item onClick={updateActions.open}>Update</Menu.Item>
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
      {updateOpened && (
        <UpdateBulkModal
          opened={updateOpened}
          close={updateActions.close}
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

const UpdateBulkModal = ({
  opened,
  close,
  rows,
}: {
  opened: boolean;
  close: () => void;
  rows: Row<JournalsMergedType>[];
}) => {
  console.log("UpdateBulkModal");
  const ids = rows.map((item) => item.original.id);
  const accountGroupings = [
    ...new Set(rows.map((item) => item.original.accountGroupingId)),
  ];
  const multipleAccountGroupings = accountGroupings.length > 1;
  const accountGroupingId = accountGroupings[0];

  const { mutate } = useUpdateJournals({ onSuccess: close });

  const form = useForm<UpdateJournalDataInputType>({
    validate: zodResolver(updateJournalInputData),
  });

  console.log("Form Values", form.values);

  const resetForm = () => {
    console.log("Resetting");
    form.reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={`Update ${rows.length} Transactions?`}
    >
      <form
        onSubmit={form.onSubmit((value) =>
          mutate({
            filters: [{ id: { in: ids } }],
            data: value,
            maxUpdated: ids.length,
          })
        )}
      >
        <Stack>
          <TextInput
            {...form.getInputProps("description")}
            value={form.values.description}
            label="Description"
          />
          <DatePicker
            {...form.getInputProps("date")}
            value={form.values.date || null}
            label="Date"
          />
          <InputCurrency
            {...form.getInputProps("amount")}
            value={form.values.amount || null}
            label="Amount"
          />
          {multipleAccountGroupings && <Text>Multiple Account Groupings</Text>}
          {!multipleAccountGroupings && (
            <>
              <AccountSelection
                {...form.getInputProps("accountId")}
                value={form.values.accountId || null}
                label="Account"
                accountGroupingId={accountGroupingId}
              />
              <CategorySelection
                {...form.getInputProps("categoryId")}
                value={form.values.categoryId || null}
                label="Category"
                accountGroupingId={accountGroupingId}
              />
              <TagSelection
                {...form.getInputProps("tagId")}
                value={form.values.tagId || null}
                label="Tag"
                accountGroupingId={accountGroupingId}
              />
              <BillSelection
                {...form.getInputProps("billId")}
                value={form.values.billId || null}
                label="Bill"
                accountGroupingId={accountGroupingId}
              />
              <BudgetSelection
                {...form.getInputProps("budgetId")}
                value={form.values.budgetId || null}
                label="Budget"
                accountGroupingId={accountGroupingId}
              />
            </>
          )}
          <Group position="apart">
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Clear
            </Button>
            <Button type="submit">Update</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
