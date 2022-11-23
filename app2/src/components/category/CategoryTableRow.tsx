import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";
import { useUpdateCategory } from "src/utils/hooks/categories/useUpdateCategory";
import { AccountGroupingCell } from "../table/Cells/AccountGroupingCell";
import { StatusSelectCell } from "../table/Cells/StatusSelectCell";
import { TextInputCell } from "../table/Cells/TextInputCell";

export const CategoryTableRow = ({ id }: { id: string }) => {
  const { category, formTitle, runMutateTitle } = useUpdateCategory({ id });
  const { data: accountGroupings } = useAccountGroupings();

  if (!category) {
    return <></>;
  }

  const accountGrouping = accountGroupings?.find(
    (item) => item.id === category.accountGroupingId
  );

  return (
    <tr key={category.id}>
      <AccountGroupingCell accountGrouping={accountGrouping} editable={false} />
      <TextInputCell
        {...formTitle.getInputProps("title")}
        onBlur={runMutateTitle}
        accountGrouping={accountGrouping}
      />
      <StatusSelectCell
        {...formTitle.getInputProps("status")}
        onBlur={runMutateTitle}
        accountGrouping={accountGrouping}
      />
    </tr>
  );
};
