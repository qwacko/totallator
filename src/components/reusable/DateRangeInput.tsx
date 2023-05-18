import { Button, Flex, Menu } from "@mantine/core";
import { DatePickerInput, type DatePickerInputProps } from "@mantine/dates";
import { IconArrowAutofitContent } from "@tabler/icons-react";
import { useMemo } from "react";

import { useLoggedInUser } from "src/utils/hooks/user/useLoggedInUser";
import { getDateRanges } from "src/utils/validation/journalEntries/dateRangeToDates";

const useDateRanges = () => {
  const { user } = useLoggedInUser();
  const dateRanges = useMemo(() => getDateRanges({ user }), [user]);

  return dateRanges;
};

export const DateRangeInput = (props: DatePickerInputProps<"range">) => {
  const dateRanges = useDateRanges();
  const { dayjsFormat } = useLoggedInUser();

  return (
    <Flex align="end" gap="sm">
      <DatePickerInput
        {...props}
        valueFormat={dayjsFormat}
        type="range"
        defaultLevel="month"
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
