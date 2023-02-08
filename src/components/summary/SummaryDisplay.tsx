import { Stack } from "@mantine/core";
import { atom, useSetAtom } from "jotai";
import { cloneDeep } from "lodash";
import { useMemo } from "react";

import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";

import { SummaryDisplayFilter } from "./SummaryDisplayFilter";
import { SummaryLineChart } from "./SummaryLineChart";
import { SummaryList } from "./SummaryList";

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
      <SummaryLineChart filtersAtom={filterAtom} />
      <SummaryList filtersAtom={filterAtom} />
    </Stack>
  );
};
