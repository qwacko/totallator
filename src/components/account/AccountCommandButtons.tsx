import type { AccountsReturnType } from "src/server/trpc/router/_app";
import { useCloneAccount } from "src/utils/hooks/accounts/useCloneAccount";
import { useDeleteAccount } from "src/utils/hooks/accounts/useDeleteAccount";

import { CommandButtons } from "../tableAtom/CommandButtons";

export const AccountCommandButtons = ({
  data
}: {
  data: AccountsReturnType;
}) => {
  const id = data.id;
  const { clone } = useCloneAccount({ id });
  const { del } = useDeleteAccount({ id });

  return (
    <CommandButtons
      cloneButton={{
        hidden: false,
        disabled: !data.userIsAdmin,
        action: clone
      }}
      deleteButton={{
        hidden: false,
        disabled: !data.userIsAdmin || data._count.journalEntries > 0,
        action: del,
        message: `Delete ${data.title}?`
      }}
    />
  );
};
