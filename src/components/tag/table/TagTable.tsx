import { ScrollArea, Stack } from "@mantine/core";
import { useMemo } from "react";

import { useTagsTableData } from "src/utils/hooks/tags/useTagsTableData";

import { AtomPagination } from "../../tableAtom/AtomPagination";
import { TableSimpleAtom } from "../../tableAtom/TableSimpleAtom";
import { TagLoadData } from "../TagLoadData";
import { TagTableHeaderDisplay } from "./TagTableHeaderDisplay";
import { TagTableRowDisplay } from "./TagTableRowDisplay";

export const TagTable = () => {
  const tableAtoms = useTagsTableData();

  const RowDisplay = useMemo(
    () =>
      function RowDisplay(rowId: string) {
        return <TagTableRowDisplay config={tableAtoms} rowId={rowId} />;
      },
    [tableAtoms]
  );

  return (
    <>
      <TagLoadData config={tableAtoms} />
      <Stack>
        <AtomPagination paginationAtom={tableAtoms.pagination} />
        <ScrollArea pb="lg">
          <TableSimpleAtom
            header={<TagTableHeaderDisplay config={tableAtoms} />}
            row={RowDisplay}
            rowsAtom={tableAtoms.displayIds}
          />
        </ScrollArea>
        <AtomPagination paginationAtom={tableAtoms.pagination} />
      </Stack>
    </>
  );
};
