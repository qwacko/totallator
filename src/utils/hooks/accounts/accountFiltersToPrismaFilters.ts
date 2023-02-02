import { accountTypeFilterToArray } from "src/components/tableAtom/TableFilterAccountTypeSelect";
import { dateRangeFilterToObject } from "src/components/tableAtom/TableFilterDateRangeInput";
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
        const stringValue = item.value;
        if (item.value.length > 0) {
          return { [item.id]: { contains: stringValue } };
        }
      }
      if (item.id === "isCash" || item.id === "isNetWorth") {
        return { [item.id]: { equals: item.value === "T" } };
      }
      if (item.id === "type") {
        const accountTypeList = accountTypeFilterToArray(item.value);
        if (accountTypeList.length > 0) {
          return { type: { in: accountTypeFilterToArray(item.value) } };
        }
      }
      if (item.id === "startDate" || item.id === "endDate") {
        return { [item.id]: dateRangeFilterToObject(item.value) };
      }
      return undefined;
    })
  );
  return processedFilters;
};
