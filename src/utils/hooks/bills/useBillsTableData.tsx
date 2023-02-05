import { useMemo } from "react";

import { type RouterOutputs } from "src/utils/trpc";
import type {
  BillFilterInputValidation,
  BillFilterValidation
} from "src/utils/validation/bill/billFilter";
import type { BillSortValidation } from "src/utils/validation/bill/billSort";

import { tableDataAtom } from "../../atoms/tableDataAtom";
import { billFiltersToPrismaFilters } from "./billFiltersToPrismaFilters";
import { billSortingStateToPrismaSort } from "./billSortingStateToPrismaSort";

export type BillSortKeys = NonNullable<BillSortValidation>[0]["key"];

export type BillFilterKeys = keyof BillFilterValidation;

export const useBillsTableData = () => {
  return useMemo(
    () =>
      tableDataAtom<
        BillFilterKeys,
        BillSortKeys,
        RouterOutputs["bills"]["get"]["data"][0],
        BillFilterInputValidation
      >({
        sortProcessing: billSortingStateToPrismaSort,
        filterProcessing: billFiltersToPrismaFilters
      }),

    []
  );
};

export type BillsTableDataType = ReturnType<typeof useBillsTableData>;
