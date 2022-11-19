import { Select, type SelectProps } from "@mantine/core";
import type { AccountGroupingReturnType } from "src/server/trpc/router/_app";

export const StatusSelectCell = ({
  accountGrouping,
  ...input
}: SelectProps & { accountGrouping?: AccountGroupingReturnType }) => {
  const isAdmin = Boolean(accountGrouping?.userIsAdmin);
  return (
    <td>
      <Select
        {...input}
        data={[
          { label: "Active", value: "Active" },
          { label: "Disabled", value: "Disabled" },
          { label: "Deleted", value: "Deleted" },
        ]}
        size="xs"
        radius={0}
        disabled={!isAdmin}
      />
    </td>
  );
};
