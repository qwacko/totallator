import type { TagsReturnType } from "src/server/trpc/router/_app";
import { useCloneTag } from "src/utils/hooks/tags/useCloneTag";
import { useDeleteTag } from "src/utils/hooks/tags/useDeleteTag";

import { CommandButtons } from "../table/CommandButtons";

export const TagCommandButtons = ({ data }: { data: TagsReturnType }) => {
  const id = data.id;
  const { clone } = useCloneTag({ id });
  const { del } = useDeleteTag({ id });

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
