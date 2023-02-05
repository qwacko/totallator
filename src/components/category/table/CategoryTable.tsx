import { ScrollArea, Stack } from "@mantine/core";
import { useMemo } from "react";

import { useCategoriesTableData } from "src/utils/hooks/categories/useCategoriesTableData";

import { AtomPagination } from "../../tableAtom/AtomPagination";
import { TableSimpleAtom } from "../../tableAtom/TableSimpleAtom";
import { CategoryLoadData } from "../CategoryLoadData";
import { CategoryTableHeaderDisplay } from "./CategoryTableHeaderDisplay";
import { CategoryTableRowDisplay } from "./CategoryTableRowDisplay";

export const CategoryTable = () => {
  const tableAtoms = useCategoriesTableData();

  const RowDisplay = useMemo(
    () =>
      function RowDisplay(rowId: string) {
        return <CategoryTableRowDisplay config={tableAtoms} rowId={rowId} />;
      },
    [tableAtoms]
  );

  return (
    <>
      <CategoryLoadData config={tableAtoms} />
      <Stack>
        <AtomPagination paginationAtom={tableAtoms.pagination} />
        <ScrollArea pb="lg">
          <TableSimpleAtom
            header={<CategoryTableHeaderDisplay config={tableAtoms} />}
            row={RowDisplay}
            rowsAtom={tableAtoms.displayIds}
          />
        </ScrollArea>
        <AtomPagination paginationAtom={tableAtoms.pagination} />
      </Stack>
    </>
  );
};
