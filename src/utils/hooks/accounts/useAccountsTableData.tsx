import { useMemo } from "react";

import { type RouterOutputs } from "src/utils/trpc";
import type {
  AccountFilterInputValidation,
  AccountFilterValidation,
  AccountSortValidation
} from "src/utils/validation/account/getAccountInputValidation";

import { tableDataAtom } from "../../atoms/tableDataAtom";
import { accountFiltersToPrismaFilters } from "./accountFiltersToPrismaFilters";
import { accountSortingStateToPrismaSort } from "./accountSortingStateToPrismaSort";

export type AccountSortKeys = AccountSortValidation[0]["key"];

export type AccountFilterKeys = keyof AccountFilterValidation;

export const useAccountsTableData = () => {
  return useMemo(
    () =>
      tableDataAtom<
        AccountFilterKeys,
        AccountSortKeys,
        RouterOutputs["accounts"]["get"]["data"][0],
        AccountFilterInputValidation
      >({
        sortProcessing: accountSortingStateToPrismaSort,
        filterProcessing: accountFiltersToPrismaFilters
      }),

    []
  );
};

export type AccountsTableDataType = ReturnType<typeof useAccountsTableData>;
