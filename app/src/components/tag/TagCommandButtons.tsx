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
      onClone={clone}
      onDelete={del}
      admin={data.userIsAdmin}
      canClone={true}
      canDelete={data._count.journalEntries === 0}
    />
  );
};
