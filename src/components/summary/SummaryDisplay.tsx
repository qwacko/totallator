import { Group, Stack } from "@mantine/core";
import {
  type PrimitiveAtom,
  atom,
  useAtom,
  useAtomValue,
  useSetAtom
} from "jotai";
import { cloneDeep } from "lodash";
import { useMemo } from "react";

import { dateRangeFilter } from "src/utils/validation/journalEntries/dateRangeFilter";
import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";

import { JournalFilterModal } from "../journals/JournalFiltersDropdown";
import { JournalTableSimple } from "../journals/journalTableSimple/journalTableSimple";
import { DateRangeSelect } from "../reusable/DateRangeSelect";

export const SummaryDisplay = ({
  initialFilter = {}
}: {
  initialFilter?: JournalFilterValidationInputType;
}) => {
  const filterAtom = useMemo(
    () => atom<JournalFilterValidationInputType>(cloneDeep(initialFilter)),
    [initialFilter]
  );
  const setFilter = useSetAtom(filterAtom);

  const resetFilter = () => {
    console.log("Initial Filter", cloneDeep(initialFilter));
    setFilter(cloneDeep(initialFilter) || {});
    return cloneDeep(initialFilter);
  };

  return (
    <Stack>
      <SummaryDisplayFilter filterAtom={filterAtom} resetFilter={resetFilter} />
      <SummaryList filtersAtom={filterAtom} />
    </Stack>
  );
};

const SummaryList = ({
  filtersAtom
}: {
  filtersAtom: PrimitiveAtom<JournalFilterValidationInputType>;
}) => {
  const filters = useAtomValue(filtersAtom);

  return (
    <>
      {JSON.stringify(filters)}
      <JournalTableSimple filters={[filters]} />
    </>
  );
};

const SummaryDisplayFilter = ({
  filterAtom,
  resetFilter
}: {
  filterAtom: PrimitiveAtom<JournalFilterValidationInputType>;
  resetFilter?: () => JournalFilterValidationInputType;
}) => {
  const [extFilter, setExtFilter] = useAtom(filterAtom);

  return (
    <Group>
      <DateRangeSelect
        value={extFilter?.dateRange || null}
        clearable
        onChange={(e) => {
          const validated = dateRangeFilter.nullable().safeParse(e);

          if (validated.success) {
            setExtFilter({
              ...extFilter,
              dateRange: validated.data || undefined
            });
          }
        }}
      />
      <JournalFilterModal
        filters={extFilter}
        setFilters={setExtFilter}
        resetFilter={resetFilter}
      />
    </Group>
  );
};
