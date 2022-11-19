import type { AccountGroupingReturnType } from "src/server/trpc/router/_app";

export const AccountGroupingCell = ({
  accountGrouping,
  editable = false,
}: {
  accountGrouping?: AccountGroupingReturnType;
  editable?: boolean;
}) => {
  if (editable) {
    return (
      <td>
        <b>{accountGrouping?.title || ""}</b>
      </td>
    );
  }
  return <td>{accountGrouping?.title || ""}</td>;
};
