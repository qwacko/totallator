import { useAtom, useSetAtom } from "jotai";
import { useEffect, useMemo } from "react";

import type { CombinedJournalDataAtomType } from "src/components/journals/journalTableSimple/CombinedJournalDataAtomType";
import { removeUndefinedAndDuplicates } from "src/utils/arrayHelpers";
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
  const setAccountData = useSetAtom(dataAtom.accountDataAtom);
  const setBillData = useSetAtom(dataAtom.billDataAtom);
  const setBudgetData = useSetAtom(dataAtom.budgetDataAtom);
  const setCategoryData = useSetAtom(dataAtom.categoryDataAtom);
  const setTagData = useSetAtom(dataAtom.tagDataAtom);

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

  const accountData = trpc.accounts.getDropdown.useQuery();
  const categoryData = trpc.categories.get.useQuery({
    filters: [
      {
        id: {
          in: journalData.data?.data
            ? removeUndefinedAndDuplicates(
                journalData.data.data.map((item) => item.categoryId)
              )
            : []
        }
      }
    ]
  });
  const tagData = trpc.tags.get.useQuery({
    filters: [
      {
        id: {
          in: journalData.data?.data
            ? removeUndefinedAndDuplicates(
                journalData.data.data.map((item) => item.tagId)
              )
            : []
        }
      }
    ]
  });
  const billData = trpc.bills.get.useQuery({
    filters: [
      {
        id: {
          in: journalData.data?.data
            ? removeUndefinedAndDuplicates(
                journalData.data.data.map((item) => item.billId)
              )
            : []
        }
      }
    ]
  });
  const budgetData = trpc.budgets.get.useQuery({
    filters: [
      {
        id: {
          in: journalData.data?.data
            ? removeUndefinedAndDuplicates(
                journalData.data.data.map((item) => item.budgetId)
              )
            : []
        }
      }
    ]
  });

  useEffect(() => {
    if (accountData.data) setAccountData(accountData.data);
  }, [accountData, setAccountData]);
  useEffect(() => {
    if (categoryData.data) setCategoryData(categoryData.data.data);
  }, [categoryData, setCategoryData]);
  useEffect(() => {
    if (tagData.data) setTagData(tagData.data.data);
  }, [tagData, setTagData]);
  useEffect(() => {
    if (billData.data) setBillData(billData.data.data);
  }, [billData, setBillData]);
  useEffect(() => {
    if (budgetData.data) setBudgetData(budgetData.data.data);
  }, [budgetData, setBudgetData]);

  useEffect(() => {
    if (journalData.data) {
      setPagination({ ...pagination, rowCount: journalData.data?.count || 0 });
      setJournalData(journalData.data?.data || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [journalData.data]);
};
