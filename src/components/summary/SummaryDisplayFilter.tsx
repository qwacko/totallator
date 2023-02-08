import { Group } from "@mantine/core";
import { type PrimitiveAtom, useAtom } from "jotai";

import { dateRangeFilter } from "src/utils/validation/journalEntries/dateRangeFilter";
import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";

import { JournalFilterModal } from "../journals/JournalFiltersDropdown";
import { DateRangeSelect } from "../reusable/DateRangeSelect";

export const SummaryDisplayFilter = ({
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
