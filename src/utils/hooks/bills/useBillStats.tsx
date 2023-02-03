import { useMemo } from "react";
import { z } from "zod";

import type { JournalFilterValidation } from "src/utils/validation/journalEntries/getJournalValidation";
import type { SummaryInputValidationType } from "src/utils/validation/summary/summaryInputValidation";
import {
  summaryReturnCoreValidation,
  summaryReturnGroupingValidation
} from "src/utils/validation/summary/summaryReturnValidation";

import { useParsedSummary } from "../summary/useParsedSummary";

const accountReturnValidation = z.array(
  summaryReturnCoreValidation.merge(
    summaryReturnGroupingValidation.pick({ billId: true })
  )
);

const accountIdGroupingList: SummaryInputValidationType["groupingList"] = [
  "billId"
];
const defaultValue: z.infer<typeof accountReturnValidation> = [];

export const useBillStats = ({ id }: { id: string }) => {
  const memoFilters = useMemo<JournalFilterValidation[]>(
    () => [
      {
        billId: { in: [id] },
        account: { type: { in: ["Asset", "Liability"] } }
      }
    ],
    [id]
  );

  const returnData = useParsedSummary({
    filters: memoFilters,
    groupingList: accountIdGroupingList,
    validation: accountReturnValidation,
    defaultValue
  });

  const found = useMemo(
    () => returnData.find((item) => item.billId === id),
    [id, returnData]
  );

  return { data: found };
};
