import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";
import { useUpdateBudget } from "src/utils/hooks/budgets/useUpdateBudget";
import { AccountGroupingCell } from "../table/Cells/AccountGroupingCell";
import { StatusSelectCell } from "../table/Cells/StatusSelectCell";
import { TextInputCell } from "../table/Cells/TextInputCell";

export const BudgetTableRow = ({ id }: { id: string }) => {
  const { budget, form, runMutate } = useUpdateBudget({ id });
  const { data: accountGroupings } = useAccountGroupings();

  if (!budget) {
    return <></>;
  }

  const accountGrouping = accountGroupings?.find(
    (item) => item.id === budget.accountGroupingId
  );

  return (
    <tr key={budget.id}>
      <AccountGroupingCell accountGrouping={accountGrouping} editable={false} />
      <TextInputCell
        {...form.getInputProps("title")}
        onBlur={runMutate}
        accountGrouping={accountGrouping}
      />
      <StatusSelectCell
        {...form.getInputProps("status")}
        onBlur={runMutate}
        accountGrouping={accountGrouping}
      />
    </tr>
  );
};
