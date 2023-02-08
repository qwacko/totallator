import { type PrimitiveAtom, useAtomValue } from "jotai";
import { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";
import { JournalTableSimple } from "../journals/journalTableSimple/journalTableSimple";

export const SummaryList = ({
  filtersAtom
}: {
  filtersAtom: PrimitiveAtom<JournalFilterValidationInputType>;
}) => {
  const filters = useAtomValue(filtersAtom);

  return (
    <>
      {JSON.stringify(filters)}
      <JournalTableSimple filters={[filters]} />
    </>
  );
};
