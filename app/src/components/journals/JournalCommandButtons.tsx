import { useCloneTransactions } from "src/utils/hooks/journals/useCloneTransactions";
import { useDeleteTransactions } from "src/utils/hooks/journals/useDeleteTransactions";
import { JournalsMergedType } from "src/utils/hooks/journals/useJournals";
import {
  useUpdateJournal,
  useUpdateJournals,
} from "src/utils/hooks/journals/useUpdateJournal";
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
  const { mutate: updateJournal } = useUpdateJournals();

  return (
    <CommandButtons
      completeButton={{
        hidden: false,
        disabled: !data.userIsAdmin,
        highlight: data.complete,
        action: () => {
          data.complete
            ? updateJournal({
                updateCompleteJournals: true,
                data: { complete: false },
                filters: [{ id: { in: [data.id] } }],
              })
            : updateJournal({
                data: { complete: true },
                filters: [{ id: { in: [data.id] } }],
              });
        },
      }}
      reconciledButton={{
        hidden: false,
        disabled: !data.userIsAdmin || data.complete,
        highlight: data.reconciled,
        action: () => {
          data.reconciled
            ? updateJournal({
                data: { reconciled: false },
                filters: [{ id: { in: [data.id] } }],
              })
            : updateJournal({
                data: { reconciled: true },
                filters: [{ id: { in: [data.id] } }],
              });
        },
      }}
      dataCheckedButton={{
        hidden: false,
        disabled: !data.userIsAdmin || data.complete,
        highlight: data.dataChecked,
        action: () => {
          data.dataChecked
            ? updateJournal({
                data: { dataChecked: false },
                filters: [{ id: { in: [data.id] } }],
              })
            : updateJournal({
                data: { dataChecked: true },
                filters: [{ id: { in: [data.id] } }],
              });
        },
      }}
      cloneButton={{
        hidden: false,
        disabled: !data.userIsAdmin,
        action: () => clone(1),
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
