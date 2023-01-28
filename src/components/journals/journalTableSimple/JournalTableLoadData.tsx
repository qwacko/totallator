import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";

import { type JournalTableConfigAtomReturn } from "src/utils/hooks/journals/useJournalsSimple";
import { trpc } from "src/utils/trpc";
import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";

import type { CombinedJournalDataAtomType } from "./CombinedJournalDataAtomType";

export const JournalTableLoadData = ({
  config,
  externalFilters,
  dataAtom
}: {
  config: JournalTableConfigAtomReturn;
  externalFilters: JournalFilterValidationInputType[];
  dataAtom: CombinedJournalDataAtomType;
}) => {
  const configAtomToUse = useMemo(() => {
    return config.configForTRPC(externalFilters);
  }, [externalFilters, config]);
  const [configData] = useAtom(configAtomToUse);
  const [pagination, setPagination] = useAtom(config.paginationAtom);

  const [, setJournalData] = useAtom(dataAtom.journalDataAtom);
  const [, setAccountData] = useAtom(dataAtom.accountDataAtom);
  const [, setBillData] = useAtom(dataAtom.billDataAtom);
  const [, setBudgetData] = useAtom(dataAtom.budgetDataAtom);
  const [, setCategoryData] = useAtom(dataAtom.categoryDataAtom);
  const [, setTagData] = useAtom(dataAtom.tagDataAtom);

  const journalData = trpc.journals.get.useQuery(configData);
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
  const accountData = trpc.accounts.get.useQuery();
  const categoryData = trpc.categories.get.useQuery();
  const tagData = trpc.tags.get.useQuery();
  const billData = trpc.bills.get.useQuery();
  const budgetData = trpc.budgets.get.useQuery();

  useEffect(() => {
    if (accountData.data) setAccountData(accountData.data);
  }, [accountData, setAccountData]);
  useEffect(() => {
    if (categoryData.data) setCategoryData(categoryData.data);
  }, [categoryData, setCategoryData]);
  useEffect(() => {
    if (tagData.data) setTagData(tagData.data);
  }, [tagData, setTagData]);
  useEffect(() => {
    if (billData.data) setBillData(billData.data);
  }, [billData, setBillData]);
  useEffect(() => {
    if (budgetData.data) setBudgetData(budgetData.data);
  }, [budgetData, setBudgetData]);

  useEffect(() => {
    if (journalData.data) {
      setPagination({ ...pagination, rowCount: journalData.data?.count || 0 });
      setJournalData(journalData.data?.data || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [journalData.data]);

  return <></>;
};
