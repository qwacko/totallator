import type { BudgetsReturnType } from "src/server/trpc/router/_app";
import { useCloneBudget } from "src/utils/hooks/budgets/useCloneBudget";
import { useDeleteBudget } from "src/utils/hooks/budgets/useDeleteBudget";
import { CommandButtons } from "../table/CommandButtons";

export const BudgetCommandButtons = ({ data }: { data: BudgetsReturnType }) => {
  const id = data.id;
  const { clone } = useCloneBudget({ id });
  const { del } = useDeleteBudget({ id });

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
