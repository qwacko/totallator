import { TextInput } from "@mantine/core";
import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";
import { useUpdateAccount } from "src/utils/hooks/accounts/useUpdateAccount";

type AccountRowColumns = "title" | "accountGroupCombined";

export const AccountTableCell = ({
  id,
  column,
}: {
  id: string;
  column: AccountRowColumns;
}) => {
  const { form, account, runMutate } = useUpdateAccount({
    id,
    keys: [column],
  });
  const { data: accountGroupings } = useAccountGroupings();

  const accountGrouping = accountGroupings?.find(
    (item) => item.id === account?.accountGroupingId
  );
  const isAdmin = accountGrouping?.userIsAdmin;
  const isAssetLiability = ["Asset", "Liability"].includes(account?.type || "");

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
    if (isAssetLiability)
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
    return <></>;
  }
  return <></>;
};
