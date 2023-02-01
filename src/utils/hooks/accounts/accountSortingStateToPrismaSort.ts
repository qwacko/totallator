import { removeUndefined } from "src/utils/arrayHelpers";
import type { AccountSortValidation } from "src/utils/validation/account/getAccountInputValidation";

import type { TableSortType } from "../table/useTableSortAtom";
import type { AccountSortKeys } from "./useAccountsAtom";

export const accountSortingStateToPrismaSort = (
  input: TableSortType<AccountSortKeys>[]
): AccountSortValidation => {
  const fixedSort: AccountSortValidation = [
    { key: "title", direction: "asc" },
    { key: "updatedAt", direction: "desc" }
  ];

  const sorting: AccountSortValidation = removeUndefined(
    input.map((item) => {
      return { key: item.id, direction: item.desc ? "desc" : "asc" };
    })
  );

  return [...sorting, ...fixedSort];
};
