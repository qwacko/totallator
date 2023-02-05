import { ScrollArea, Stack } from "@mantine/core";
import { useMemo } from "react";

import { useAccountsTableData } from "src/utils/hooks/accounts/useAccountsTableData";

import { AtomPagination } from "../../tableAtom/AtomPagination";
import { TableSimpleAtom } from "../../tableAtom/TableSimpleAtom";
import { AccountLoadData } from "../AccountLoadData";
import { AccountTableHeaderDisplay } from "./AccountTableHeaderDisplay";
import { AccountTableRowDisplay } from "./AccountTableRowDisplay";

export const AccountTable = () => {
  const tableAtoms = useAccountsTableData();

  const RowDisplay = useMemo(
    () =>
      function RowDisplay(rowId: string) {
        return <AccountTableRowDisplay config={tableAtoms} rowId={rowId} />;
      },
    [tableAtoms]
  );

  return (
    <>
      <AccountLoadData config={tableAtoms} />
      <Stack>
        <AtomPagination paginationAtom={tableAtoms.pagination} />
        <ScrollArea pb="lg">
          <TableSimpleAtom
            header={<AccountTableHeaderDisplay config={tableAtoms} />}
            row={RowDisplay}
            rowsAtom={tableAtoms.displayIds}
          />
        </ScrollArea>
        <AtomPagination paginationAtom={tableAtoms.pagination} />
      </Stack>
    </>
  );
};
