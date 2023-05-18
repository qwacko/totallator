import { Button, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMenu2 } from "@tabler/icons-react";
import { type PrimitiveAtom, atom, useAtom, useSetAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";

import type { AppRouterInputs } from "src/server/trpc/router/_app";
import type { JournalTableConfigAtomReturn } from "src/utils/hooks/journals/useJournalsSimple";
import { useUpdateJournals } from "src/utils/hooks/journals/useUpdateJournal";
import { trpc } from "src/utils/trpc";
import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";

import type { CombinedJournalDataAtomType } from "../CombinedJournalDataAtomType";
import { CloneSelectedJournalsModal } from "./CloneSelectedJournalsModal";
import { DeleteSelectedJournalsModal } from "./DeleteSelectedJournalsModal";
import { UpdateSelectedJournalsModal } from "./UpdateSelectedJournalsModal";

const useMemoAtom = <T,>(initialValue: T) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const jotaiAtom = useMemo(() => atom(initialValue), []);

  return jotaiAtom;
};

export const JournalTableBulkActionsAtom = ({
  config,
  journalData,
  externalFilters
}: {
  config: JournalTableConfigAtomReturn;
  journalData: CombinedJournalDataAtomType;
  externalFilters: JournalFilterValidationInputType[];
}) => {
  const selectedIdsAtom = useMemoAtom<string[]>([]);
  const accountGroupingIdsAtom = useMemoAtom<string[]>([]);

  const [deleteOpened, deleteActions] = useDisclosure(false);
  const [cloneOpened, cloneActions] = useDisclosure(false);
  const [updateOpened, updateActions] = useDisclosure(false);

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
            selectedIdsAtom={selectedIdsAtom}
            accountGroupingIdsAtom={accountGroupingIdsAtom}
            openDelete={deleteActions.open}
            openClone={cloneActions.open}
            openUpdate={updateActions.open}
          />
        </Menu.Dropdown>
      </Menu>
      {deleteOpened && (
        <DeleteSelectedJournalsModal
          opened={deleteOpened}
          close={deleteActions.close}
          rows={selectedIdsAtom}
        />
      )}
      {cloneOpened && (
        <CloneSelectedJournalsModal
          opened={cloneOpened}
          close={cloneActions.close}
          rows={selectedIdsAtom}
        />
      )}
      {updateOpened && (
        <UpdateSelectedJournalsModal
          opened={updateOpened}
          close={updateActions.close}
          rows={selectedIdsAtom}
          accountGroupingIds={accountGroupingIdsAtom}
        />
      )}
    </>
  );
};

const JournalTableBulkActionsDropdownAtom = ({
  config,
  journalData,
  externalFilters,
  selectedIdsAtom,
  accountGroupingIdsAtom,
  openDelete,
  openClone,
  openUpdate
}: {
  config: JournalTableConfigAtomReturn;
  journalData: CombinedJournalDataAtomType;
  externalFilters: JournalFilterValidationInputType[];
  selectedIdsAtom: PrimitiveAtom<string[]>;
  accountGroupingIdsAtom: PrimitiveAtom<string[]>;
  openDelete: () => void;
  openClone: () => void;
  openUpdate: () => void;
}) => {
  //General State
  const [updatingAllMatching, setUpdatingAllMatching] = useState(false);
  const [hasComplete, setHasComplete] = useState<boolean>(true);

  //Jotai State
  const [selectedIds, setSelectedIds] = useAtom(selectedIdsAtom);
  const setAccountGroupingIds = useSetAtom(accountGroupingIdsAtom);
  const [atomSelectionIds, updateSelection] = useAtom(config.selectedRowsAtom);
  const configAtomToUse = useMemo(() => {
    return config.configForTRPC(externalFilters);
  }, [externalFilters, config]);
  const [configData] = useAtom(configAtomToUse);
  const [journals] = useAtom(journalData.mergedJournalDataAtom);
  const [journalIds] = useAtom(journalData.rowIdAtom);

  //TRPC
  const trpcUtils = trpc.useContext();
  const { mutate: updateJournals } = useUpdateJournals();

  //For selection of all items that match filter. This retrieves the necessary information from the server
  const getAllItems = async (
    type: AppRouterInputs["journals"]["getSelectionInfo"]["type"] = "All"
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

  //When using the manual item selection, this updates the selection information.
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
  }, [
    journals,
    atomSelectionIds,
    updatingAllMatching,
    setAccountGroupingIds,
    setSelectedIds
  ]);

  return (
    <>
      <Menu.Label>Bulk Modify {selectedIds.length} Transactions</Menu.Label>
      <Menu.Item
        onClick={openDelete}
        disabled={selectedIds.length === 0 || hasComplete}
        color="red"
      >
        Delete
      </Menu.Item>
      <Menu.Item onClick={openClone} disabled={selectedIds.length === 0}>
        Clone
      </Menu.Item>
      <Menu.Item onClick={openUpdate} disabled={hasComplete}>
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
      <Menu.Divider />
      <Menu.Label>Page Selection</Menu.Label>
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

      <Menu.Label>All Matching Selection</Menu.Label>
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
      <Menu.Item
        closeMenuOnClick={false}
        onClick={() => {
          getAllItems("Reconciled");
        }}
      >
        Select Reconciled
      </Menu.Item>
      <Menu.Item
        closeMenuOnClick={false}
        onClick={() => {
          getAllItems("Unreconciled");
        }}
      >
        Select Unreconciled
      </Menu.Item>
      <Menu.Item
        closeMenuOnClick={false}
        onClick={() => {
          getAllItems("DataChecked");
        }}
      >
        Select Data Checked
      </Menu.Item>
      <Menu.Item
        closeMenuOnClick={false}
        onClick={() => {
          getAllItems("NotDataChecked");
        }}
      >
        Select Data Not Checked
      </Menu.Item>
    </>
  );
};
