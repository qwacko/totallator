import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";
import { useUpdateAccount } from "src/utils/hooks/accounts/useUpdateAccount";
import { AccountGroupingCell } from "../table/Cells/AccountGroupingCell";
import { StatusSelectCell } from "../table/Cells/StatusSelectCell";
import { TextInputCell } from "../table/Cells/TextInputCell";

export const AccountTableRow = ({ id }: { id: string }) => {
  const { account, formCombined, runMutateCombined } = useUpdateAccount({ id });
  const { data: accountGroupings } = useAccountGroupings();

  if (!account) {
    return <></>;
  }

  const accountGrouping = accountGroupings?.find(
    (item) => item.id === account.accountGroupingId
  );

  const isAssetLiability = ["Asset", "Liability"].includes(
    formCombined.values.type || ""
  );

  return (
    <tr key={account.id}>
      <AccountGroupingCell accountGrouping={accountGrouping} editable={false} />
      <TextInputCell
        {...formCombined.getInputProps("title")}
        onBlur={runMutateCombined}
        accountGrouping={accountGrouping}
      />
      <TextInputCell
        {...formCombined.getInputProps("accountGroupCombined")}
        onBlur={runMutateCombined}
        accountGrouping={accountGrouping}
        showBlank={!isAssetLiability}
      />
      <StatusSelectCell
        {...formCombined.getInputProps("status")}
        onBlur={runMutateCombined}
        accountGrouping={accountGrouping}
      />
    </tr>
  );
};
