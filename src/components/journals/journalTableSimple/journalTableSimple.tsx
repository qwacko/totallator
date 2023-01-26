import { ScrollArea, Stack } from "@mantine/core";
import { useMemo } from "react";

import { journalTableConfigAtom } from "src/utils/hooks/journals/useJournalsSimple";
import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";

import { AtomPagination } from "./AtomPagination";
import { combinedJournalDataAtom } from "./CombinedJournalDataAtomType";
import { JournalTableHeaderDisplay } from "./JournalTableHeaderDisplay";
import { JournalTableLoadData } from "./JournalTableLoadData";
import { JournalTableRowDisplay } from "./JournalTableRowDisplay";
import { TableSimpleAtom } from "./TableSimpleAtom";

export const JournalTableSimple = ({
  filters
}: {
  filters: JournalFilterValidationInputType[];
}) => {
  const configData = useMemo(() => journalTableConfigAtom(), []);
  const journalData = useMemo(() => combinedJournalDataAtom(), []);

  const header = (
    <JournalTableHeaderDisplay config={configData} journalData={journalData} />
  );

  const RowDisplay = (rowId: string) => {
    return (
      <JournalTableRowDisplay
        rowId={rowId}
        journalData={journalData}
        config={configData}
      />
    );
  };

  return (
    <>
      <JournalTableLoadData
        config={configData}
        externalFilters={filters}
        dataAtom={journalData}
      />
      <Stack>
        <AtomPagination paginationAtom={configData.paginationAtom} />
        <ScrollArea pb="lg">
          <TableSimpleAtom
            header={header}
            row={RowDisplay}
            rowsAtom={journalData.rowIdAtom}
          />
        </ScrollArea>
        <AtomPagination paginationAtom={configData.paginationAtom} />
      </Stack>
    </>
  );
};
