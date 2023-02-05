import { useMemo } from "react";
import type { ZodTypeAny, z } from "zod";

import { trpc } from "src/utils/trpc";
import type { SummaryInputValidationType } from "src/utils/validation/summary/summaryInputValidation";

export const useParsedSummary = <T extends ZodTypeAny>({
  filters,
  groupingList,
  validation,
  defaultValue
}: SummaryInputValidationType & {
  validation: T;
  defaultValue: z.infer<T>;
}): z.infer<T> => {
  const statsInfo = trpc.summary.getTimeData.useQuery({
    filters,
    groupingList
  });

  const processedData = useMemo(() => {
    if (statsInfo.data) {
      const parsedData = validation.safeParse(statsInfo.data);
      if (parsedData.success) {
        return parsedData.data;
      }
      return defaultValue;
    }
    return defaultValue;
  }, [statsInfo.data, defaultValue, validation]);

  return processedData;
};
