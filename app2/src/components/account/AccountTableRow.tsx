import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";
import { useUpdateAccount } from "src/utils/hooks/accounts/useUpdateAccount";
import { AccountGroupingCell } from "../table/Cells/AccountGroupingCell";
import { StatusSelectCell } from "../table/Cells/StatusSelectCell";
import { TextInputCell } from "../table/Cells/TextInputCell";

export const AccountTableRow = ({ id }: { id: string }) => {
  const { account, form, runMutate } = useUpdateAccount({ id });
  const { data: accountGroupings } = useAccountGroupings();

  if (!account) {
    return <></>;
  }

  const accountGrouping = accountGroupings?.find(
    (item) => item.id === account.accountGroupingId
  );

  return (
    <tr key={account.id}>
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
