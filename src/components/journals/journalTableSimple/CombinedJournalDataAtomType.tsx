import deepEquals from "fast-deep-equal";
import { atom } from "jotai";
import { selectAtom } from "jotai/utils";

import { buildMergedData } from "src/utils/hooks/journals/helpers/buildMergedData";
import { type RouterOutputs } from "src/utils/trpc";
import type { JournalEntryGetValidationType } from "src/utils/validation/journalEntries/readJournalEntriesValidation";

export const combinedJournalDataAtom = () => {
  const journalDataAtom = atom<JournalEntryGetValidationType["data"]>([]);
  const accountDataAtom = atom<RouterOutputs["accounts"]["get"]>([]);
  const billDataAtom = atom<RouterOutputs["bills"]["get"]>([]);
  const budgetDataAtom = atom<RouterOutputs["budgets"]["get"]>([]);
  const categoryDataAtom = atom<RouterOutputs["categories"]["get"]>([]);
  const tagDataAtom = atom<RouterOutputs["tags"]["get"]>([]);
  const accountGroupingsDataAtom = atom<
    RouterOutputs["accountGroupings"]["get"]
  >([]);
  const mergedJournalDataAtom = atom((get) => {
    return buildMergedData({
      bills: get(billDataAtom),
      budgets: get(budgetDataAtom),
      categories: get(categoryDataAtom),
      tags: get(tagDataAtom),
      input: get(journalDataAtom),
      accounts: get(accountDataAtom),
      accountGroupings: get(accountGroupingsDataAtom)
    });
  });

  const rowIdAtom = selectAtom(
    journalDataAtom,
    (data) => data.map((item) => item.id),
    deepEquals
  );

  return {
    journalDataAtom,
    accountDataAtom,
    billDataAtom,
    budgetDataAtom,
    categoryDataAtom,
    tagDataAtom,
    mergedJournalDataAtom,
    rowIdAtom
  };
};

export type CombinedJournalDataAtomType = ReturnType<
  typeof combinedJournalDataAtom
>;
