import { useCloneTransactions } from "src/utils/hooks/journals/useCloneTransactions";
import { JournalsMergedType } from "src/utils/hooks/journals/useJournals";
import { CommandButtons } from "../table/CommandButtons";

export const JournalCommandButtons = ({
  data,
}: {
  data: JournalsMergedType;
}) => {
  const id = data.id;
  const { clone } = useCloneTransactions({
    ids: [data.transactionId],
    maxUpdated: 1,
  });

  return (
    <CommandButtons
      canDelete={false}
      canClone={true}
      onClone={clone}
      admin={data.userIsAdmin}
    />
  );
};
