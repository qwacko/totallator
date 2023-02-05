import { ScrollArea, Stack } from "@mantine/core";
import { useMemo } from "react";

import { useBillsTableData } from "src/utils/hooks/bills/useBillsTableData";

import { AtomPagination } from "../../tableAtom/AtomPagination";
import { TableSimpleAtom } from "../../tableAtom/TableSimpleAtom";
import { BillLoadData } from "../BillLoadData";
import { BillTableHeaderDisplay } from "./BillTableHeaderDisplay";
import { BillTableRowDisplay } from "./BillTableRowDisplay";

export const BillTable = () => {
  const tableAtoms = useBillsTableData();

  const RowDisplay = useMemo(
    () =>
      function RowDisplay(rowId: string) {
        return <BillTableRowDisplay config={tableAtoms} rowId={rowId} />;
      },
    [tableAtoms]
  );

  return (
    <>
      <BillLoadData config={tableAtoms} />
      <Stack>
        <AtomPagination paginationAtom={tableAtoms.pagination} />
        <ScrollArea pb="lg">
          <TableSimpleAtom
            header={<BillTableHeaderDisplay config={tableAtoms} />}
            row={RowDisplay}
            rowsAtom={tableAtoms.displayIds}
          />
        </ScrollArea>
        <AtomPagination paginationAtom={tableAtoms.pagination} />
      </Stack>
    </>
  );
};
