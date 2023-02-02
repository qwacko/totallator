import { TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconX } from "@tabler/icons";
import { useEffect, useState } from "react";

import {
  type TableFilterAtomType,
  useFilterAtom
} from "src/utils/hooks/table/useTableFilterAtom";

export const TableFilterStringInput = <T extends string>({
  filterAtom,
  columnId
}: {
  filterAtom: TableFilterAtomType<T>;
  columnId: T;
}) => {
  const [filterState, updateFilter] = useFilterAtom(filterAtom, columnId);
  const [value, setValue] = useState<string>("");
  const [debounced] = useDebouncedValue(value, 300);

  useEffect(() => {
    if (!filterState.value) {
      updateFilter({ action: "update", value: debounced });
    } else if (debounced && debounced !== filterState.value.value) {
      updateFilter({ action: "update", value: debounced });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  useEffect(() => {
    if (filterState.value) {
      setValue(filterState.value.value);
    } else {
      setValue("");
    }
  }, [filterState]);

  return (
    <TextInput
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
      onBlur={() => {
        updateFilter({ action: "update", value });
      }}
      rightSection={
        <IconX size={12} onClick={() => updateFilter({ action: "clear" })} />
      }
      size="xs"
    />
  );
};
