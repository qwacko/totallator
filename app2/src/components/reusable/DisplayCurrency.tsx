import { useLoggedInUser } from "src/utils/hooks/user/useLoggedInUser";
import { currencyFormatter } from "src/utils/validation/user/currencyFormats";

export const useDisplayCurrency = () => {
  const { user } = useLoggedInUser();

  const formatter = currencyFormatter(user ? user.currencyFormat : "USD");

  return (value: number) => formatter.format(value);
};
