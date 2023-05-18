import { Box, Button, Stack } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { format } from "date-fns";

import { PopoverEdit } from "./PopoverEdit";

export const DatePickerWithPopoverEditNew = ({
  value,
  onChange,
  dateFnsFormat,
  clearable = false,
  disabled = false
}: {
  value: Date | null | undefined;
  onChange: (e: Date | null) => void;
  dateFnsFormat: string;
  clearable?: boolean;
  disabled?: boolean;
}) => {
  if (disabled) {
    return (
      <span>
        {value ? (
          format(value, dateFnsFormat)
        ) : (
          <Box sx={{ width: 60, height: 10 }} />
        )}
      </span>
    );
  }
  return (
    <PopoverEdit
      displayValue={
        <span>
          {value ? (
            format(value, dateFnsFormat)
          ) : (
            <Box sx={{ width: 60, height: 10 }} />
          )}
        </span>
      }
      editing={false}
    >
      <Stack>
        <DatePicker
          type="default"
          value={value}
          defaultDate={value || new Date()}
          defaultLevel="month"
          onChange={onChange}
        />
        {clearable && <Button onClick={() => onChange(null)}>Clear</Button>}
      </Stack>
    </PopoverEdit>
  );
};
