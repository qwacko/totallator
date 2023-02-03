import { ScrollArea, Stack } from "@mantine/core";
import { useMemo } from "react";

import { useBudgetsTableData } from "src/utils/hooks/budgets/useBudgetsTableData";

import { AtomPagination } from "../../tableAtom/AtomPagination";
import { TableSimpleAtom } from "../../tableAtom/TableSimpleAtom";
import { BudgetLoadData } from "../BudgetLoadData";
import { BudgetTableHeaderDisplay } from "./BudgetTableHeaderDisplay";
import { BudgetTableRowDisplay } from "./BudgetTableRowDisplay";

export const BudgetTable = () => {
  const tableAtoms = useBudgetsTableData();

  const RowDisplay = useMemo(
    () =>
      function RowDisplay(rowId: string) {
        return <BudgetTableRowDisplay config={tableAtoms} rowId={rowId} />;
      },
    [tableAtoms]
  );

  return (
    <>
      <BudgetLoadData config={tableAtoms} />
      <Stack>
        <AtomPagination paginationAtom={tableAtoms.pagination} />
        <ScrollArea pb="lg">
          <TableSimpleAtom
            header={<BudgetTableHeaderDisplay config={tableAtoms} />}
            row={RowDisplay}
            rowsAtom={tableAtoms.displayIds}
          />
        </ScrollArea>
        <AtomPagination paginationAtom={tableAtoms.pagination} />
      </Stack>
    </>
  );
};
