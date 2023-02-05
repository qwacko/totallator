import type { User } from "@prisma/client";
import {
  addMonths,
  addYears,
  endOfMonth,
  endOfQuarter,
  endOfYear,
  startOfMonth,
  startOfQuarter,
  startOfYear,
  subMonths,
  subQuarters,
  subYears
} from "date-fns";

import type { UserReturn } from "src/server/trpc/router/user";

import type { dateRangeType } from "./dateRangeFilter";

export const dateRangeToDates = ({
  user,
  dateRange
}: {
  user: UserReturn | User | undefined;
  dateRange: dateRangeType;
}) => {
  const dateRanges = getDateRanges({ user });

  const foundDateRange = dateRanges.find((item) => item.id === dateRange);

  return foundDateRange;
};

export const getDateRanges = ({
  user
}: {
  user: User | UserReturn | undefined;
}): {
  id: dateRangeType;
  title: string;
  group: "All" | "Year" | "Month" | "Quarter";
  end: Date;
  start: Date;
}[] => {
  const firstMonth = user?.firstMonthFY || 1;

  const now = new Date();
  const startOfFY = addMonths(
    startOfYear(subMonths(now, firstMonth - 1)),
    firstMonth - 1
  );
  const endOfFY = endOfMonth(
    addMonths(endOfYear(subMonths(now, firstMonth - 1)), firstMonth - 1)
  );

  return [
    {
      id: "all",
      title: "All",
      group: "All",
      end: addYears(now, 10),
      start: new Date(1900, 0, 0)
    },
    {
      id: "thisCalendarYear",
      title: "Current Year",
      group: "Year",
      end: endOfYear(now),
      start: startOfYear(now)
    },
    {
      id: "lastCalendarYear",
      title: "Previous Year",
      group: "Year",
      end: endOfYear(subYears(now, 1)),
      start: startOfYear(subYears(now, 1))
    },
    {
      id: "thisYear",
      title: "Last 12 Months",
      group: "Year",
      end: now,
      start: subYears(now, 1)
    },
    {
      id: "thisFY",
      title: "Current Financial Year",
      group: "Year",
      end: endOfFY,
      start: startOfFY
    },
    {
      id: "lastFY",
      title: "Previous Financial Year",
      group: "Year",
      end: subYears(endOfFY, 1),
      start: subYears(startOfFY, 1)
    },
    {
      id: "thisQuarter",
      title: "Current Quarter",
      group: "Quarter",
      end: endOfQuarter(now),
      start: startOfQuarter(now)
    },
    {
      id: "lastQuarter",
      title: "Previous Quarter",
      group: "Quarter",
      end: endOfQuarter(subQuarters(now, 1)),
      start: startOfQuarter(subQuarters(now, 1))
    },
    {
      id: "thisMonth",
      title: "Current Month",
      group: "Month",
      end: endOfMonth(now),
      start: startOfMonth(now)
    },
    {
      id: "lastMonth",
      title: "Previous Month",
      group: "Month",
      end: endOfMonth(subMonths(now, 1)),
      start: startOfMonth(subMonths(now, 1))
    }
  ];
};
