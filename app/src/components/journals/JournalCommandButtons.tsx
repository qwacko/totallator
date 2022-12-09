import { useCloneTransactions } from "src/utils/hooks/journals/useCloneTransactions";
import { useDeleteTransactions } from "src/utils/hooks/journals/useDeleteTransactions";
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
  const { deleteTrans } = useDeleteTransactions({
    ids: [data.transactionId],
    maxDeleted: 1,
    deleteComplete: false,
  });

  return (
    <CommandButtons
      cloneButton={{
        hidden: false,
        disabled: !data.userIsAdmin,
        action: clone,
      }}
      deleteButton={{
        hidden: false,
        disabled: !data.userIsAdmin || data.complete,
        action: deleteTrans,
        message: `Delete Transaction ${data.description}?`,
      }}
    />
  );
};
