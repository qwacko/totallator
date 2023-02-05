import type { CategoriesReturnType } from "src/server/trpc/router/_app";
import { useCloneCategory } from "src/utils/hooks/categories/useCloneCategory";
import { useDeleteCategory } from "src/utils/hooks/categories/useDeleteCategory";

import { CommandButtons } from "../tableAtom/CommandButtons";

export const CategoryCommandButtons = ({
  data
}: {
  data: CategoriesReturnType;
}) => {
  const id = data.id;
  const { clone } = useCloneCategory({ id });
  const { del } = useDeleteCategory({ id });

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
