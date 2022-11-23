import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";
import { useUpdateTag } from "src/utils/hooks/categories/useUpdateTag";
import { AccountGroupingCell } from "../table/Cells/AccountGroupingCell";
import { StatusSelectCell } from "../table/Cells/StatusSelectCell";
import { TextInputCell } from "../table/Cells/TextInputCell";

export const TagTableRow = ({ id }: { id: string }) => {
  const { tag, formTitle, runMutateTitle } = useUpdateTag({ id });
  const { data: accountGroupings } = useAccountGroupings();

  if (!tag) {
    return <></>;
  }

  const accountGrouping = accountGroupings?.find(
    (item) => item.id === tag.accountGroupingId
  );

  const props = formTitle.getInputProps("title");

  console.log("props", props);

  return (
    <tr key={tag.id}>
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
