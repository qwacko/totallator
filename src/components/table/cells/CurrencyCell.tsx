import { useLoggedInUser } from "src/utils/hooks/user/useLoggedInUser";
import { currencyFormatter } from "src/utils/validation/user/currencyFormats";

import { TextCell } from "./TextCell";

export const CurrencyCell = ({
  amount
}: {
  amount: string | number | null | undefined;
}) => {
  const { user } = useLoggedInUser();
  const formatter = currencyFormatter(user ? user.currencyFormat : "USD");

  if (amount === null || amount === undefined) {
    return <></>;
  }

  const stringValue = typeof amount === "string" ? amount : amount.toString();

  return (
    <TextCell>
      {!Number.isNaN(parseFloat(stringValue))
        ? formatter.format(parseFloat(stringValue))
        : ""}
    </TextCell>
  );
};
