import { type PrimitiveAtom, useAtomValue } from "jotai";

import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";

import { UpdateBulkJournalsModal } from "./UpdateBulkJournalsModal";

export const UpdateSelectedJournalsModal = ({
  opened,
  close,
  rows,
  accountGroupingIds
}: {
  opened: boolean;
  close: () => void;
  rows: PrimitiveAtom<string[]>;
  accountGroupingIds: PrimitiveAtom<string[]>;
}) => {
  const ids = useAtomValue(rows);
  const accountGroupingIdsUse = useAtomValue(accountGroupingIds);

  const multipleAccountGroupings = accountGroupingIdsUse.length > 1;
  const accountGroupingId = accountGroupingIdsUse[0];

  const filter: JournalFilterValidationInputType[] = [{ id: { in: ids } }];
  const maxUpdated = ids.length;

  return (
    <UpdateBulkJournalsModal
      opened={opened}
      close={close}
      filters={filter}
      maxUpdated={maxUpdated}
      multipleAccountGroupings={multipleAccountGroupings}
      accountGroupingId={accountGroupingId}
    />
  );
};
