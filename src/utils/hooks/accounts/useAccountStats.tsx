import { eachMonthOfInterval, format, set, subDays, subMonths } from "date-fns";
import { useEffect, useMemo } from "react";
import { z } from "zod";

import { trpc } from "src/utils/trpc";
import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";
import type { SummaryInputValidationType } from "src/utils/validation/summary/summaryInputValidation";
import {
  summaryReturnCoreValidation,
  summaryReturnGroupingValidation
} from "src/utils/validation/summary/summaryReturnValidation";

import { useParsedSummary } from "../summary/useParsedSummary";

const accountReturnValidation = z.array(
  summaryReturnCoreValidation.merge(
    summaryReturnGroupingValidation.pick({ accountId: true })
  )
);

const accountIdGroupingList: SummaryInputValidationType["groupingList"] = [
  "accountId"
];
const defaultValue: z.infer<typeof accountReturnValidation> = [];

const useHistoricalData = (
  filters: JournalFilterValidationInputType[],
  months = 12
) => {
  const [startDate, prevDate] = useMemo(() => {
    const targetDate = set(subMonths(new Date(), months), { date: 0 });
    return [targetDate, subDays(targetDate, 1)];
  }, [months]);

  const { data: startingAmount } = trpc.summary.getTimeData.useQuery({
    filters: [...filters, { date: { lte: prevDate } }],
    groupingList: ["accountGroupingId"]
  });

  const { data: positiveAmounts } = trpc.summary.getTimeData.useQuery({
    filters: [...filters, { date: { gte: startDate }, amount: { gte: 0 } }],
    groupingList: ["yearMonth"]
  });

  const { data: negativeAmounts } = trpc.summary.getTimeData.useQuery({
    filters: [...filters, { date: { gte: startDate }, amount: { lte: 0 } }],
    groupingList: ["yearMonth"]
  });

  const returnData = useMemo(() => {
    const endDate = new Date();
    const dateIntervals = eachMonthOfInterval({
      start: startDate,
      end: endDate
    });
    const groupedData = dateIntervals.map((item) => {
      const key = format(item, "yyyy-MM");
      const pos = positiveAmounts
        ? positiveAmounts.find((item) => item.yearMonth === key)
        : undefined;
      const neg = negativeAmounts
        ? negativeAmounts.find((item) => item.yearMonth === key)
        : undefined;
      // console.log(key, { pos });
      return {
        key,
        positive: pos?._sum?.amount ? pos._sum.amount : 0,
        negative: neg?._sum?.amount ? neg._sum.amount : 0
      };
    });

    const startTotal =
      startingAmount && startingAmount[0] && startingAmount[0]._sum?.amount
        ? startingAmount[0]._sum.amount
        : 0;

    const groupedWithTotals = groupedData.map((item, index) => {
      const posTotal = groupedData
        .slice(0, index)
        .reduce((prev, current) => prev + current.positive, 0);
      const negTotal = groupedData
        .slice(0, index)
        .reduce((prev, current) => prev + current.negative, 0);

      const total = posTotal + negTotal + startTotal;

      return { ...item, total };
    });

    return groupedWithTotals;
  }, [startDate, startingAmount, positiveAmounts, negativeAmounts]);

  return returnData;
};

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
