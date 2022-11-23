import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";
import { useUpdateBill } from "src/utils/hooks/bills/useUpdateBIll";
import { AccountGroupingCell } from "../table/Cells/AccountGroupingCell";
import { StatusSelectCell } from "../table/Cells/StatusSelectCell";
import { TextInputCell } from "../table/Cells/TextInputCell";

export const BillTableRow = ({ id }: { id: string }) => {
  const { bill, form, runMutate } = useUpdateBill({ id });
  const { data: accountGroupings } = useAccountGroupings();

  if (!bill) {
    return <></>;
  }

  const accountGrouping = accountGroupings?.find(
    (item) => item.id === bill.accountGroupingId
  );

  return (
    <tr key={bill.id}>
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
