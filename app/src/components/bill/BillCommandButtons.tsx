import type { BillsReturnType } from "src/server/trpc/router/_app";
import { useCloneBill } from "src/utils/hooks/bills/useCloneBill";
import { useDeleteBill } from "src/utils/hooks/bills/useDeleteBill";
import { CommandButtons } from "../table/CommandButtons";

export const BillCommandButtons = ({ data }: { data: BillsReturnType }) => {
  const id = data.id;
  const { clone } = useCloneBill({ id });
  const { del } = useDeleteBill({ id });

  return (
    <CommandButtons
      cloneButton={{
        hidden: false,
        disabled: !data.userIsAdmin,
        action: clone,
      }}
      deleteButton={{
        hidden: false,
        disabled: !data.userIsAdmin || data._count.journalEntries > 0,
        action: del,
        message: `Delete ${data.title}?`,
      }}
    />
  );
};
