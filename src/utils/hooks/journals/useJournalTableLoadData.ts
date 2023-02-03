import { useAtom, useSetAtom } from "jotai";
import { useEffect, useMemo } from "react";

import type { CombinedJournalDataAtomType } from "src/components/journals/journalTableSimple/CombinedJournalDataAtomType";
import { type JournalTableConfigAtomReturn } from "src/utils/hooks/journals/useJournalsSimple";
import { trpc } from "src/utils/trpc";
import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";

export type UseJournalTableLoadDataProps = {
  config: JournalTableConfigAtomReturn;
  externalFilters: JournalFilterValidationInputType[];
  dataAtom: CombinedJournalDataAtomType;
};
export const useJournalTableLoadData = ({
  config,
  externalFilters,
  dataAtom
}: UseJournalTableLoadDataProps) => {
  const configAtomToUse = useMemo(() => {
    return config.configForTRPC(externalFilters);
  }, [externalFilters, config]);
  const [configData] = useAtom(configAtomToUse);
  const [pagination, setPagination] = useAtom(config.paginationAtom);

  const setJournalData = useSetAtom(dataAtom.journalDataAtom);

  const journalData = trpc.journals.get.useQuery(configData);

  //Preload the previous and next page of data
  trpc.journals.get.useQuery({
    ...configData,
    pagination: configData.pagination
      ? {
          ...configData.pagination,
          pageNo: configData.pagination.pageNo + 1
        }
      : undefined
  });
  trpc.journals.get.useQuery({
    ...configData,
    pagination: configData.pagination
      ? {
          ...configData.pagination,
          pageNo: Math.max(configData.pagination.pageNo - 1, 0)
        }
      : undefined
  });

  useEffect(() => {
    if (journalData.data) {
      setPagination({ ...pagination, rowCount: journalData.data?.count || 0 });
      setJournalData(journalData.data?.data || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [journalData.data]);
};
