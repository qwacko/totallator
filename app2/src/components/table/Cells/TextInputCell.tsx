import { TextInput, type TextInputProps } from "@mantine/core";
import type { AccountGroupingReturnType } from "src/server/trpc/router/_app";

export const TextInputCell = (
  input: TextInputProps & {
    accountGrouping?: AccountGroupingReturnType;
    showBlank?: boolean;
  }
) => {
  const { showBlank, accountGrouping, ...other } = input;
  if (showBlank) {
    return <td></td>;
  }

  const isAdmin = Boolean(accountGrouping?.userIsAdmin);
  return (
    <td>
      <TextInput
        {...other}
        value={other.value || ""}
        size="xs"
        radius={0}
        inputMode="text"
        disabled={!isAdmin}
      />
    </td>
  );
};
