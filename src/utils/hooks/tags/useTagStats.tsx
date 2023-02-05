import { useMemo } from "react";
import { z } from "zod";

import type { JournalFilterValidation } from "src/utils/validation/journalEntries/getJournalValidation";
import type { SummaryInputValidationType } from "src/utils/validation/summary/summaryInputValidation";
import {
  summaryReturnCoreValidation,
  summaryReturnGroupingValidation
} from "src/utils/validation/summary/summaryReturnValidation";

import { useHistoricalData } from "../summary/useHistoricalData";
import { useParsedSummary } from "../summary/useParsedSummary";

const accountReturnValidation = z.array(
  summaryReturnCoreValidation.merge(
    summaryReturnGroupingValidation.pick({ tagId: true })
  )
);

const accountIdGroupingList: SummaryInputValidationType["groupingList"] = [
  "tagId"
];
const defaultValue: z.infer<typeof accountReturnValidation> = [];

export const useTagStats = ({ id }: { id: string }) => {
  const memoFilters = useMemo<JournalFilterValidation[]>(
    () => [
      {
        tagId: { in: [id] },
        account: { type: { in: ["Asset", "Liability"] } }
      }
    ],
    [id]
  );

  const historicalData = useHistoricalData(memoFilters);

  const returnData = useParsedSummary({
    filters: memoFilters,
    groupingList: accountIdGroupingList,
    validation: accountReturnValidation,
    defaultValue
  });

  const found = useMemo(
    () => returnData.find((item) => item.tagId === id),
    [id, returnData]
  );

  return { data: found, historicalData };
};
