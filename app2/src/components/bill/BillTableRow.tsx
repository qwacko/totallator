import { Select, TextInput } from "@mantine/core";
import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";
import { useUpdateBill } from "src/utils/hooks/bills/useUpdateBIll";

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
      <td>{accountGrouping?.title || ""}</td>
      <td>
        <TextInput {...form.getInputProps("title")} onBlur={runMutate} />
      </td>
      <td>
        <Select
          {...form.getInputProps("status")}
          data={[
            { label: "Active", value: "Active" },
            { label: "Disabled", value: "Disabled" },
            { label: "Deleted", value: "Deleted" },
          ]}
          onBlur={runMutate}
        />
      </td>
    </tr>
  );
};
