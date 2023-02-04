import { z } from "zod";

import {
  type TableFilterAtomType,
  useFilterAtom
} from "src/utils/hooks/table/useTableFilterAtom";
import { PrismaAccountTypeEnumValidation } from "src/utils/validation/PrismaAccountTypeEnumValidation";

import { AccountMultiSelect } from "../account/AccountSelect";

const accountTypeFilterToString = (data: string[]) =>
  JSON.stringify(data);
export const accountTypeFilterToArray = (data: string) => {
  const arrayData = JSON.parse(data);
  const processedData = z
    .array(PrismaAccountTypeEnumValidation)
    .safeParse(arrayData);
  if (processedData.success) {
    return processedData.data;
  }
  return [];
};

export const TableFilterAccountTypeSelect = <T extends string>({
  filterAtom,
  columnId
}: {
  filterAtom: TableFilterAtomType<T>;
  columnId: T;
}) => {
  const [filterState, updateFilter] = useFilterAtom(filterAtom, columnId);

  const value = filterState?.value
    ? JSON.parse(filterState.value.value)
    : undefined;

  return (
    <AccountMultiSelect
      value={value || []}
      onChange={(e) => {
        if (e.length === 0) {
          updateFilter({ action: "clear" });
        } else {
          updateFilter({
            action: "update",
            value: accountTypeFilterToString(e)
          });
        }
      }}
      clearable
      size="xs"
    />
  );
};
