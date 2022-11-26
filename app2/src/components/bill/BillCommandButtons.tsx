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
      onClone={clone}
      onDelete={del}
      admin={data.userIsAdmin}
      canClone={true}
      canDelete={data._count.journalEntries === 0}
    />
  );
};
