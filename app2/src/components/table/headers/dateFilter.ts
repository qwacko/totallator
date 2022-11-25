import type { DateRangePickerValue } from "@mantine/dates";
import { type FilterFn } from "@tanstack/react-table";

export const dateFilter = <T extends Record<string, unknown>>(key: keyof T) => {
  const filterFunction: FilterFn<T> = (row, columnId, value) => {
    const filter = value as DateRangePickerValue | undefined | null;
    const date = row.original[key] as Date;

    if (filter) {
      const [startDate, endDate] = filter;
      const matchesStartDate = startDate ? date >= startDate : true;
      const matchesEndDate = endDate ? date <= endDate : true;

      console.log("Date Filter", {
        startDate,
        endDate,
        date,
        matchesStartDate,
        matchesEndDate,
      });
      return matchesEndDate && matchesStartDate;
    }
    return true;
  };

  return filterFunction;
};
