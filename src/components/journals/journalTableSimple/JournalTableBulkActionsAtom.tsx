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
import { useEffect, useMemo, useState } from "react";

import { useCloneTransactions } from "src/utils/hooks/journals/useCloneTransactions";
import { useDeleteTransactions } from "src/utils/hooks/journals/useDeleteTransactions";
import type { JournalTableConfigAtomReturn } from "src/utils/hooks/journals/useJournalsSimple";
import { useUpdateJournals } from "src/utils/hooks/journals/useUpdateJournal";
import { trpc } from "src/utils/trpc";
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
  journalData,
  externalFilters
}: {
  config: JournalTableConfigAtomReturn;
  journalData: CombinedJournalDataAtomType;
  externalFilters: JournalFilterValidationInputType[];
}) => {
  return (
    <>
      <Menu withinPortal={true}>
        <Menu.Target>
          <Button compact>
            <IconMenu2 size={15} />
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <JournalTableBulkActionsDropdownAtom
            config={config}
            journalData={journalData}
            externalFilters={externalFilters}
          />
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

const JournalTableBulkActionsDropdownAtom = ({
  config,
  journalData,
  externalFilters
}: {
  config: JournalTableConfigAtomReturn;
  journalData: CombinedJournalDataAtomType;
  externalFilters: JournalFilterValidationInputType[];
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [hasComplete, setHasComplete] = useState<boolean>(true);
  const [accountGroupingIds, setAccountGroupingIds] = useState<string[]>([]);

  const trpcUtils = trpc.useContext();

  const [updatingAllMatching, setUpdatingAllMatching] = useState(false);

  const [deleteOpened, deleteActions] = useDisclosure(false);
  const [cloneOpened, cloneActions] = useDisclosure(false);
  const [updateOpened, updateActions] = useDisclosure(false);

  const [atomSelectionIds, updateSelection] = useAtom(config.selectedRowsAtom);
  const configAtomToUse = useMemo(() => {
    return config.configForTRPC(externalFilters);
  }, [externalFilters, config]);
  const [configData] = useAtom(configAtomToUse);

  const [journals] = useAtom(journalData.mergedJournalDataAtom);
  const [journalIds] = useAtom(journalData.rowIdAtom);

  const { mutate: updateJournals } = useUpdateJournals();

  const getAllItems = async (
    type: "Complete" | "Incomplete" | "All" = "All"
  ) => {
    const data = await trpcUtils.journals.getSelectionInfo.fetch({
      type,
      filters: configData.filters
    });

    setUpdatingAllMatching(true);
    setSelectedIds(data.ids);
    setHasComplete(data.hasComplete);
    setAccountGroupingIds(data.accountGroupingIds);
  };

  useEffect(() => {
    if (!updatingAllMatching) {
      const selection = journals.filter((item) =>
        atomSelectionIds.includes(item.id)
      );
      const newHasComplete = selection.reduce(
        (prev, current) => (prev ? true : current.complete),
        false
      );
      const accountGroupingIds = [
        ...new Set(selection.map((item) => item.accountGroupingId))
      ];

      setSelectedIds(selection.map((item) => item.id));
      setHasComplete(newHasComplete);
      setAccountGroupingIds(accountGroupingIds);
    }
  }, [journals, atomSelectionIds, updatingAllMatching]);

  // const hasComplete = selection.reduce(
  //   (prev, current) => (prev ? prev : current.complete),
  //   false
  // );

  return (
    <>
      <Menu.Label>
        <Text
          fw={updatingAllMatching ? 700 : undefined}
          td={updatingAllMatching ? "underline" : undefined}
        >
          All Matching Selection
        </Text>
      </Menu.Label>
      <Menu.Item
        closeMenuOnClick={false}
        onClick={() => {
          getAllItems("All");
        }}
      >
        Select All
      </Menu.Item>
      <Menu.Item
        closeMenuOnClick={false}
        onClick={() => {
          getAllItems("Incomplete");
        }}
      >
        Select Incomplete
      </Menu.Item>
      <Menu.Item
        closeMenuOnClick={false}
        onClick={() => {
          getAllItems("Complete");
        }}
      >
        Select Complete
      </Menu.Item>
      <Menu.Label>
        <Text
          fw={!updatingAllMatching ? 700 : undefined}
          td={!updatingAllMatching ? "underline" : undefined}
        >
          Page Selection
        </Text>
      </Menu.Label>
      <Menu.Item
        closeMenuOnClick={false}
        onClick={() => {
          setUpdatingAllMatching(false);
          updateSelection(journalIds);
        }}
      >
        Select All
      </Menu.Item>
      <Menu.Item
        closeMenuOnClick={false}
        onClick={() => {
          setUpdatingAllMatching(false);
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
          setUpdatingAllMatching(false);
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
          setUpdatingAllMatching(false);
          updateSelection([]);
        }}
      >
        Clear Selection
      </Menu.Item>
      <Menu.Divider />
      <Menu.Label>Bulk Modify {selectedIds.length} Transactions</Menu.Label>
      <Menu.Item
        onClick={deleteActions.open}
        disabled={selectedIds.length === 0 || hasComplete}
        color="red"
      >
        Delete
      </Menu.Item>
      <Menu.Item
        onClick={cloneActions.open}
        disabled={selectedIds.length === 0}
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
            maxUpdated: selectedIds.length,
            filters: [{ id: { in: selectedIds } }]
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
            maxUpdated: selectedIds.length,
            filters: [{ id: { in: selectedIds } }]
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
            maxUpdated: selectedIds.length,
            filters: [{ id: { in: selectedIds } }]
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
            maxUpdated: selectedIds.length,
            filters: [{ id: { in: selectedIds } }]
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
            maxUpdated: selectedIds.length,
            filters: [{ id: { in: selectedIds } }]
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
            filters: [{ id: { in: selectedIds } }]
          })
        }
        disabled={!hasComplete}
      >
        Mark Incomplete
      </Menu.Item>
      {deleteOpened && (
        <DeleteModal
          opened={deleteOpened}
          close={deleteActions.close}
          rows={selectedIds}
        />
      )}
      {cloneOpened && (
        <CloneModal
          opened={cloneOpened}
          close={cloneActions.close}
          rows={selectedIds}
        />
      )}
      {updateOpened && (
        <UpdateSelectedModal
          opened={updateOpened}
          close={updateActions.close}
          rows={selectedIds}
          accountGroupingIds={accountGroupingIds}
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
  rows: string[];
}) => {
  const ids = rows;

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
  rows: string[];
}) => {
  const ids = rows;

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
  rows,
  accountGroupingIds
}: {
  opened: boolean;
  close: () => void;
  rows: string[];
  accountGroupingIds: string[];
}) => {
  console.log("UpdateBulkModal");
  const ids = rows;

  const multipleAccountGroupings = accountGroupingIds.length > 1;
  const accountGroupingId = accountGroupingIds[0];

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
