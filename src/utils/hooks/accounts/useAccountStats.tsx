import { useMemo } from "react";
import { z } from "zod";

import type { SummaryInputValidationType } from "src/utils/validation/summary/summaryInputValidation";
import {
  summaryReturnCoreValidation,
  summaryReturnGroupingValidation
} from "src/utils/validation/summary/summaryReturnValidation";

import { useParsedSummary } from "../summary/useParsedSummary";
import { useHistoricalData } from "../summary/useHistoricalData";

const accountReturnValidation = z.array(
  summaryReturnCoreValidation.merge(
    summaryReturnGroupingValidation.pick({ accountId: true })
  )
);

const accountIdGroupingList: SummaryInputValidationType["groupingList"] = [
  "accountId"
];
const defaultValue: z.infer<typeof accountReturnValidation> = [];

export const useAccountStats = ({ id }: { id: string }) => {
  const memoFilters = useMemo(() => [{ accountId: { in: [id] } }], [id]);

  const historicalData = useHistoricalData(memoFilters);

  const returnData = useParsedSummary({
    filters: memoFilters,
    groupingList: accountIdGroupingList,
    validation: accountReturnValidation,
    defaultValue
  });

  const found = useMemo(
    () => returnData.find((item) => item.accountId === id),
    [id, returnData]
  );

  return { data: found, historicalData };
};
