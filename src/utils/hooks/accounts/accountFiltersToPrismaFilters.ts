import { removeUndefined } from "src/utils/arrayHelpers";
import type { AccountFilterInputValidation } from "src/utils/validation/account/getAccountInputValidation";

import type { TableFilterType } from "../table/useTableFilterAtom";
import type { AccountFilterKeys } from "./useAccountsTableData";

export const accountFiltersToPrismaFilters = ({
  filters
}: {
  filters: TableFilterType<AccountFilterKeys>[];
}): AccountFilterInputValidation[] | undefined => {
  const processedFilters: AccountFilterInputValidation[] = removeUndefined(
    filters.map((item): AccountFilterInputValidation | undefined => {
      if (
        item.id === "title" ||
        item.id === "accountGroup" ||
        item.id === "accountGroup2" ||
        item.id === "accountGroup3" ||
        item.id === "accountGroupCombined" ||
        item.id === "accountTitleCombined"
      ) {
        return { title: { contains: item.value } };
      }
      if (item.id === "isCash" || item.id === "isNetWorth") {
        return { [item.id]: { equals: item.value === "T" } };
      }
      return undefined;
    })
  );
  return processedFilters;
};
