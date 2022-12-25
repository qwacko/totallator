import { NumberInput, type NumberInputProps } from "@mantine/core";
import { useLoggedInUser } from "src/utils/hooks/user/useLoggedInUser";
import {
  currencyFormatter,
  currencyUnformatter,
} from "src/utils/validation/user/currencyFormats";

export const InputCurrency = (input: NumberInputProps) => {
  const { user } = useLoggedInUser();

  const formatter = currencyFormatter(user ? user.currencyFormat : "USD");
  const unformatter = currencyUnformatter(user ? user.currencyFormat : "USD");

  return (
    <NumberInput
      {...input}
      precision={user?.currencyFormat === "JPY" ? 0 : 2}
      formatter={(value) => {
        return value && !Number.isNaN(parseFloat(value))
          ? formatter.format(parseFloat(value))
          : "";
      }}
      parser={(value) => {
        return value ? unformatter(value).toString() : undefined;
      }}
    />
  );
};
