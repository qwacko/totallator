import { TextInput, type TextInputProps } from "@mantine/core";
import type { AccountGroupingReturnType } from "src/server/trpc/router/_app";

export const TextInputCell = (
  input: TextInputProps & { accountGrouping?: AccountGroupingReturnType }
) => {
  const isAdmin = Boolean(input?.accountGrouping?.userIsAdmin);
  return (
    <td>
      <TextInput
        {...input}
        value={input.value || ""}
        size="xs"
        radius={0}
        inputMode="text"
        disabled={!isAdmin}
      />
    </td>
  );
};
