import { type PrimitiveAtom, useAtomValue } from "jotai";
import { useMemo } from "react";

import { useHistoricalData } from "src/utils/hooks/summary/useHistoricalData";
import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";

import { StatsGraphDisplay } from "../reusable/StatsGraphDisplay";

export const SummaryLineChart = ({
  filtersAtom
}: {
  filtersAtom: PrimitiveAtom<JournalFilterValidationInputType>;
}) => {
  const filters = useAtomValue(filtersAtom);
  const filtersArray = useMemo(() => [filters], [filters]);

  const historicalData = useHistoricalData(filtersArray);

  return <StatsGraphDisplay data={historicalData} />;
};
