import { TextInput, Text } from "@mantine/core";
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
  const { formCombined, account, runMutate } = useUpdateAccount({ id });
  const { data: accountGroupings } = useAccountGroupings();

  const accountGrouping = accountGroupings?.find(
    (item) => item.id === account?.accountGroupingId
  );
  const isAdmin = accountGrouping?.userIsAdmin;
  const isAssetLiability = ["Asset", "Liability"].includes(account?.type || "");

  if (column === "title") {
    return (
      <TextInput
        {...formCombined.getInputProps("title")}
        type="text"
        onBlur={runMutate}
        disabled={!isAdmin}
      />
    );
  }
  if (column === "accountGroupCombined") {
    if (isAssetLiability)
      return (
        <TextInput
          {...formCombined.getInputProps("accountGroupCombined")}
          type="text"
          onBlur={runMutate}
          disabled={!isAdmin}
        />
      );
    return <></>;
  }
  return <></>;
};
