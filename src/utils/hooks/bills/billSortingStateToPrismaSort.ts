import { removeUndefined } from "src/utils/arrayHelpers";
import type { BillSortValidation } from "src/utils/validation/bill/billSort";

import type { TableSortType } from "../table/useTableSortAtom";
import type { BillSortKeys } from "./useBillsTableData";

export const billSortingStateToPrismaSort = (
  input: TableSortType<BillSortKeys>[]
): NonNullable<BillSortValidation> => {
  const fixedSort: NonNullable<BillSortValidation> = [
    { key: "title", direction: "asc" },
    { key: "updatedAt", direction: "desc" }
  ];

  const sorting: NonNullable<BillSortValidation> = removeUndefined(
    input.map((item) => {
      return { key: item.id, direction: item.desc ? "desc" : "asc" };
    })
  );

  return [...sorting, ...fixedSort];
};
