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
