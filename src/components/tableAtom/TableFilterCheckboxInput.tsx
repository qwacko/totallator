import { Checkbox } from "@mantine/core";

import {
  type TableFilterAtomType,
  useFilterAtom
} from "src/utils/hooks/table/useTableFilterAtom";

export const TableFilterCheckboxInput = <T extends string>({
  filterAtom,
  columnId
}: {
  filterAtom: TableFilterAtomType<T>;
  columnId: T;
}) => {
  const [filterState, updateFilter] = useFilterAtom(filterAtom, columnId);

  const checked = filterState?.value
    ? filterState.value?.value === "T"
    : undefined;
  const toggleFilter = () => {
    if (checked === undefined) {
      updateFilter({ action: "update", value: "T" });
    } else if (checked) {
      updateFilter({ action: "update", value: "" });
    } else {
      updateFilter({ action: "clear" });
    }
  };

  return (
    <Checkbox
      checked={checked}
      onClick={toggleFilter}
      indeterminate={checked === undefined}
    />
  );
};
