import { Select, TextInput } from "@mantine/core";
import type { AppRouterOutputs } from "src/server/trpc/router/_app";
import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";
import { useUpdateAccount } from "src/utils/hooks/accounts/useUpdateAccount";

export type AccountRowColumns = "title" | "accountGroupCombined" | "type";

export const AccountTableCell = ({
  id,
  column,
  data,
}: {
  id: string;
  column: AccountRowColumns;
  data: AppRouterOutputs["accounts"]["get"][0];
}) => {
  const { form, runMutate } = useUpdateAccount({
    id,
    keys: [column],
    data,
  });
  const { data: accountGroupings } = useAccountGroupings();

  const accountGrouping = accountGroupings?.find(
    (item) => item.id === data?.accountGroupingId
  );
  const isAdmin = accountGrouping?.userIsAdmin;
  const isAssetLiability = ["Asset", "Liability"].includes(data?.type || "");

  if (column === "title") {
    return (
      <form>
        <TextInput
          {...form.getInputProps("title")}
          type="text"
          onBlur={runMutate}
          disabled={!isAdmin}
        />
      </form>
    );
  }
  if (column === "accountGroupCombined") {
    if (isAssetLiability) {
      return (
        <form>
          <TextInput
            {...form.getInputProps("accountGroupCombined")}
            type="text"
            onBlur={runMutate}
            disabled={!isAdmin}
          />
        </form>
      );
    }
    return <></>;
  }
  if (column === "type") {
    console.log("Type Value", form.values.type);
    return (
      <form>
        <Select
          {...form.getInputProps("type")}
          data={["Asset", "Liability", "Income", "Expense"]}
          disabled={!isAdmin}
          clearable={false}
          onBlur={runMutate}
        />
      </form>
    );
  }
  return <></>;
};
