import type { CategoriesReturnType } from "src/server/trpc/router/_app";
import { useCloneCategory } from "src/utils/hooks/categories/useCloneCategory";
import { useDeleteCategory } from "src/utils/hooks/categories/useDeleteCategory";
import { CommandButtons } from "../table/CommandButtons";

export const CategoryCommandButtons = ({
  data,
}: {
  data: CategoriesReturnType;
}) => {
  const id = data.id;
  const { clone } = useCloneCategory({ id });
  const { del } = useDeleteCategory({ id });

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
