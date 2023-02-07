import type { ParsedUrlQuery } from "querystring";
import { z } from "zod";

import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";

export const defaultJournalFilters: JournalFilterValidationInputType = {
  account: { type: { in: ["Asset", "Liability"] } }
};

export const generateFiltersFromURLIds = (
  queryData: ParsedUrlQuery,
  idToQuery: (ids: string[]) => JournalFilterValidationInputType
) => {
  const validatedQuery = z
    .object({
      id: z.preprocess(
        (data) => String(data).split(","),
        z.array(z.string().cuid()).min(1)
      )
    })
    .safeParse(queryData);
  const defaultFilter: JournalFilterValidationInputType = validatedQuery.success
    ? idToQuery(validatedQuery.data.id)
    : defaultJournalFilters;
  const ids = validatedQuery.success ? validatedQuery.data.id[0] : undefined;
  return [defaultFilter, ids] as const;
};
