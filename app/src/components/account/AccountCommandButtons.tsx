import type { AccountsReturnType } from "src/server/trpc/router/_app";
import { useCloneAccount } from "src/utils/hooks/accounts/useCloneAccount";
import { useDeleteAccount } from "src/utils/hooks/accounts/useDeleteAccount";
import { CommandButtons } from "../table/CommandButtons";

export const AccountCommandButtons = ({
  data,
}: {
  data: AccountsReturnType;
}) => {
  const id = data.id;
  const { clone } = useCloneAccount({ id });
  const { del } = useDeleteAccount({ id });

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
