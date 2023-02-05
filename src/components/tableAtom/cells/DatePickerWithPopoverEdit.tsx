import { Box, Button, Stack } from "@mantine/core";
import { Calendar } from "@mantine/dates";
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
        <Calendar
          value={value}
          initialMonth={value || new Date()}
          onChange={onChange}
        />
        {clearable && <Button onClick={() => onChange(null)}>Clear</Button>}
      </Stack>
    </PopoverEdit>
  );
};
