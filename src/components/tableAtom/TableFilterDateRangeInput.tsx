import { Stack } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useEffect, useState } from "react";
import SuperJSON from "superjson";

import {
  type TableFilterAtomType,
  useFilterAtom
} from "src/utils/hooks/table/useTableFilterAtom";
import {
  type DateFilterNonOptionalType,
  dateFilterNonOptional
} from "src/utils/validation/journalEntries/dateFilter";

const dateRangeFilterToString = (data: DateFilterNonOptionalType) =>
  SuperJSON.stringify(data);
export const dateRangeFilterToObject = (data: string) => {
  const objectData = SuperJSON.parse(data);
  const processedData = dateFilterNonOptional.safeParse(objectData);
  if (processedData.success) {
    return processedData.data;
  }
  return {};
};

export const TableFilterDateRangeInput = <T extends string>({
  filterAtom,
  columnId
}: {
  filterAtom: TableFilterAtomType<T>;
  columnId: T;
}) => {
  const [filterState, updateFilter] = useFilterAtom(filterAtom, columnId);
  const [filter, setFilter] = useState<DateFilterNonOptionalType>({});

  useEffect(() => {
    if (filterState.value) {
      setFilter(dateRangeFilterToObject(filterState.value.value));
    } else {
      setFilter({});
    }
  }, [filterState, setFilter, updateFilter]);

  return (
    <Stack>
      <DatePicker
        value={filter.gte || null}
        onChange={(e) => {
          updateFilter({
            action: "update",
            value: dateRangeFilterToString({
              gte: e || undefined,
              lte: filter.lte
            })
          });
        }}
      />
      <DatePicker
        value={filter.lte || null}
        onChange={(e) => {
          updateFilter({
            action: "update",
            value: dateRangeFilterToString({
              gte: filter.gte,
              lte: e || undefined
            })
          });
        }}
      />
    </Stack>
  );
};
