import deepEquals from "fast-deep-equal";
import { atom } from "jotai";
import { selectAtom } from "jotai/utils";

import { buildMergedData } from "src/utils/hooks/journals/helpers/buildMergedData";
import type { JournalEntryGetValidationType } from "src/utils/validation/journalEntries/readJournalEntriesValidation";

export const combinedJournalDataAtom = () => {
  const journalDataAtom = atom<JournalEntryGetValidationType["data"]>([]);

  const mergedJournalDataAtom = atom((get) => {
    return buildMergedData({
      input: get(journalDataAtom)
    });
  });

  const rowIdAtom = selectAtom(
    journalDataAtom,
    (data) => data.map((item) => item.id),
    deepEquals
  );

  return {
    journalDataAtom,
    mergedJournalDataAtom,
    rowIdAtom
  };
};

export type CombinedJournalDataAtomType = ReturnType<
  typeof combinedJournalDataAtom
>;
