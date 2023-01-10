import { Button, Flex, Menu } from "@mantine/core";
import type { DateRangePickerProps } from "@mantine/dates";
import { DateRangePicker } from "@mantine/dates";
import { IconArrowAutofitContent } from "@tabler/icons";
import {
  addMonths,
  endOfMonth,
  endOfQuarter,
  startOfQuarter,
  startOfYear,
  subMonths,
  subQuarters,
  subYears,
  endOfYear,
  startOfMonth,
  addYears,
} from "date-fns";
import { useMemo } from "react";
import { useLoggedInUser } from "src/utils/hooks/user/useLoggedInUser";

const useDateRanges = () => {
  const { user } = useLoggedInUser();
  const firstMonth = user?.firstMonthFY || 1;

  const dateRanges = useMemo(() => {
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
        title: "All",
        group: "All",
        end: addYears(now, 10),
        start: new Date(1900, 0, 0),
      },
      {
        title: "Current Year",
        group: "Year",
        end: endOfYear(now),
        start: startOfYear(now),
      },
      {
        title: "Previous Year",
        group: "Year",
        end: endOfYear(subYears(now, 1)),
        start: startOfYear(subYears(now, 1)),
      },
      {
        title: "Current Financial Year",
        group: "Year",
        end: endOfFY,
        start: startOfFY,
      },
      {
        title: "Previous Financial Year",
        group: "Year",
        end: subYears(endOfFY, 1),
        start: subYears(startOfFY, 1),
      },
      {
        title: "Current Quarter",
        group: "Quarter",
        end: endOfQuarter(now),
        start: startOfQuarter(now),
      },
      {
        title: "Previous Quarter",
        group: "Quarter",
        end: endOfQuarter(subQuarters(now, 1)),
        start: startOfQuarter(subQuarters(now, 1)),
      },
      {
        title: "Current Month",
        group: "Month",
        end: endOfMonth(now),
        start: startOfMonth(now),
      },
      {
        title: "Previous Month",
        group: "Month",
        end: endOfMonth(subMonths(now, 1)),
        start: startOfMonth(subMonths(now, 1)),
      },
    ];
  }, [firstMonth]);

  return dateRanges;
};

export const DateRangeInput = (props: DateRangePickerProps) => {
  const dateRanges = useDateRanges();
  const { dayjsFormat } = useLoggedInUser();

  return (
    <Flex align="end" gap="sm">
      <DateRangePicker
        {...props}
        inputFormat={dayjsFormat}
        fullWidth
        amountOfMonths={3}
        sx={{ flexGrow: 1 }}
      />
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button compact>
            <IconArrowAutofitContent size={15} />
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          {dateRanges.map((range) => (
            <Menu.Item
              key={range.title}
              onClick={() =>
                props.onChange && props.onChange([range.start, range.end])
              }
            >
              {range.title}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
};
