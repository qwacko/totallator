import { format } from "date-fns";
import { useLoggedInUser } from "src/utils/hooks/user/useLoggedInUser";
import { TextCell } from "./TextCell";

export const DateCell = ({
  displayDate,
}: {
  displayDate: Date | null | undefined;
}) => {
  const { dateFormat } = useLoggedInUser();

  if (!displayDate) {
    return <></>;
  }
  return <TextCell>{format(displayDate, dateFormat)}</TextCell>;
};
