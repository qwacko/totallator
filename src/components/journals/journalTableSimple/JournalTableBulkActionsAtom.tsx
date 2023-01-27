import {
  Button,
  Group,
  Menu,
  Modal,
  NumberInput,
  Stack,
  Text,
  TextInput
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconMenu2 } from "@tabler/icons";
import { useAtom } from "jotai";
import { useState } from "react";

import type { JournalsMergedType } from "src/utils/hooks/journals/helpers/buildMergedData";
import { useCloneTransactions } from "src/utils/hooks/journals/useCloneTransactions";
import { useDeleteTransactions } from "src/utils/hooks/journals/useDeleteTransactions";
import type { JournalTableConfigAtomReturn } from "src/utils/hooks/journals/useJournalsSimple";
import { useUpdateJournals } from "src/utils/hooks/journals/useUpdateJournal";
import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";
import {
  type UpdateJournalDataInputType,
  updateJournalInputData
} from "src/utils/validation/journalEntries/updateJournalValidation";

import { AccountSelection } from "../../account/AccountSelection";
import { BillSelection } from "../../bill/BillSelection";
import { BudgetSelection } from "../../budget/BudgetSelection";
import { CategorySelection } from "../../category/CategorySelection";
import { InputCurrency } from "../../reusable/InputCurrency";
import { TagSelection } from "../../tag/TagSelection";
import type { CombinedJournalDataAtomType } from "./CombinedJournalDataAtomType";

export const JournalTableBulkActionsAtom = ({
  config,
  journalData
}: {
  config: JournalTableConfigAtomReturn;
  journalData: CombinedJournalDataAtomType;
}) => {
  const [deleteOpened, deleteActions] = useDisclosure(false);
  const [cloneOpened, cloneActions] = useDisclosure(false);
  const [updateOpened, updateActions] = useDisclosure(false);

  const [selectionIds, updateSelection] = useAtom(config.selectedRowsAtom);
  const [journals] = useAtom(journalData.mergedJournalDataAtom);
  const [journalIds] = useAtom(journalData.rowIdAtom);

  const selection = journals.filter((item) => selectionIds.includes(item.id));

  const { mutate: updateJournals } = useUpdateJournals();

  const hasComplete = selection.reduce(
    (prev, current) => (prev ? prev : current.complete),
    false
  );

  return (
    <>
      <Menu withinPortal={true}>
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
              updateSelection(journalIds);
            }}
          >
            Select All
          </Menu.Item>
          <Menu.Item
            closeMenuOnClick={false}
            onClick={() => {
              const incompleteIds = journals
                .filter((item) => !item.complete)
                .map((item) => item.id);
              updateSelection(incompleteIds);
            }}
          >
            Select Incomplete
          </Menu.Item>
          <Menu.Item
            closeMenuOnClick={false}
            onClick={() => {
              const incompleteIds = journals
                .filter((item) => item.complete)
                .map((item) => item.id);
              updateSelection(incompleteIds);
            }}
          >
            Select Complete
          </Menu.Item>
          <Menu.Item
            closeMenuOnClick={false}
            onClick={() => {
              updateSelection([]);
            }}
          >
            Clear Selection
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label>Bulk Modify {selection.length} Transactions</Menu.Label>
          <Menu.Item
            onClick={deleteActions.open}
            disabled={selection.length === 0 || hasComplete}
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
          <Menu.Item onClick={updateActions.open} disabled={hasComplete}>
            Update
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label>Bulk Update</Menu.Label>
          <Menu.Item
            onClick={() =>
              updateJournals({
                data: { reconciled: true },
                maxUpdated: selectionIds.length,
                filters: [{ id: { in: selectionIds } }]
              })
            }
            disabled={hasComplete}
          >
            Mark Reconciled
          </Menu.Item>
          <Menu.Item
            onClick={() =>
              updateJournals({
                data: { dataChecked: true },
                maxUpdated: selectionIds.length,
                filters: [{ id: { in: selectionIds } }]
              })
            }
            disabled={hasComplete}
          >
            Mark Data Checked
          </Menu.Item>
          <Menu.Item
            onClick={() =>
              updateJournals({
                data: { complete: true },
                maxUpdated: selectionIds.length,
                filters: [{ id: { in: selectionIds } }]
              })
            }
            disabled={hasComplete}
          >
            Mark Complete
          </Menu.Item>
          <Menu.Item
            onClick={() =>
              updateJournals({
                data: { complete: true, reconciled: true, dataChecked: true },
                maxUpdated: selectionIds.length,
                filters: [{ id: { in: selectionIds } }]
              })
            }
            disabled={hasComplete}
          >
            Mark Complete/Reconciled/Checked
          </Menu.Item>
          <Menu.Item
            onClick={() =>
              updateJournals({
                data: { dataChecked: false, reconciled: false },
                maxUpdated: selectionIds.length,
                filters: [{ id: { in: selectionIds } }]
              })
            }
            disabled={hasComplete}
          >
            Clear Status
          </Menu.Item>
          <Menu.Item
            onClick={() =>
              updateJournals({
                data: { complete: false },
                maxUpdated: journalIds.length,
                updateCompleteJournals: true,
                filters: [{ id: { in: selectionIds } }]
              })
            }
            disabled={!hasComplete}
          >
            Mark Incomplete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
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
        <UpdateSelectedModal
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
  rows
}: {
  opened: boolean;
  close: () => void;
  rows: JournalsMergedType[];
}) => {
  const ids = rows.map((item) => {
    const rowData = item;
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
  rows
}: {
  opened: boolean;
  close: () => void;
  rows: JournalsMergedType[];
}) => {
  const ids = rows.map((item) => {
    const rowData = item;
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

const UpdateSelectedModal = ({
  opened,
  close,
  rows
}: {
  opened: boolean;
  close: () => void;
  rows: JournalsMergedType[];
}) => {
  console.log("UpdateBulkModal");
  const ids = rows.map((item) => item.id);
  const accountGroupings = [
    ...new Set(rows.map((item) => item.accountGroupingId))
  ];
  const multipleAccountGroupings = accountGroupings.length > 1;
  const accountGroupingId = accountGroupings[0];

  const filter: JournalFilterValidationInputType[] = [{ id: { in: ids } }];
  const maxUpdated = ids.length;

  return (
    <UpdateBulkModal
      opened={opened}
      close={close}
      filters={filter}
      maxUpdated={maxUpdated}
      multipleAccountGroupings={multipleAccountGroupings}
      accountGroupingId={accountGroupingId}
    />
  );
};

const UpdateBulkModal = ({
  opened,
  close,
  filters,
  maxUpdated,
  multipleAccountGroupings,
  accountGroupingId
}: {
  opened: boolean;
  close: () => void;
  filters: JournalFilterValidationInputType[];
  maxUpdated: number;
  multipleAccountGroupings: boolean;
  accountGroupingId: string | undefined;
}) => {
  const { mutate } = useUpdateJournals({ onSuccess: close });

  const form = useForm<UpdateJournalDataInputType>({
    validate: zodResolver(updateJournalInputData)
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
      title={`Update ${maxUpdated} Transactions?`}
    >
      <form
        onSubmit={form.onSubmit((value) =>
          mutate({
            filters,
            data: value,
            maxUpdated
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
            value={form.values.amount || undefined}
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
                searchable
                createExpenseOption
                onCreateSuccess={(newId) =>
                  form.setFieldValue("accountId", newId)
                }
              />
              <CategorySelection
                {...form.getInputProps("categoryId")}
                value={form.values.categoryId || null}
                label="Category"
                accountGroupingId={accountGroupingId}
                searchable
              />
              <TagSelection
                {...form.getInputProps("tagId")}
                value={form.values.tagId || null}
                label="Tag"
                accountGroupingId={accountGroupingId}
                searchable
              />
              <BillSelection
                {...form.getInputProps("billId")}
                value={form.values.billId || null}
                label="Bill"
                accountGroupingId={accountGroupingId}
                searchable
              />
              <BudgetSelection
                {...form.getInputProps("budgetId")}
                value={form.values.budgetId || null}
                label="Budget"
                accountGroupingId={accountGroupingId}
                searchable
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
