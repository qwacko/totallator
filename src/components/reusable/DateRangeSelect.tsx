import { Select, type SelectProps } from "@mantine/core";
import { useMemo } from "react";

import { useLoggedInUser } from "src/utils/hooks/user/useLoggedInUser";
import { getDateRanges } from "src/utils/validation/journalEntries/dateRangeToDates";

export const DateRangeSelect = (props: Omit<SelectProps, "data">) => {
  const { user } = useLoggedInUser();
  const dateData = useMemo(() => {
    const dateRanges = getDateRanges({ user });
    return dateRanges.map((item) => ({ value: item.id, label: item.title }));
  }, [user]);

  return <Select {...props} data={dateData} />;
};
