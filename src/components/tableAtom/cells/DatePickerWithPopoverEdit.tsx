import { Box, Button, Popover, Stack, Text } from "@mantine/core";
import { Calendar, DatePicker, type DatePickerProps } from "@mantine/dates";
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
  return (
    <PopoverEdit
      displayValue={
        <span>
          {disabled ? (
            <></>
          ) : value ? (
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

export const DatePickerWithPopoverEdit = (
  props: DatePickerProps & {
    editing: boolean;
    onComplete: () => void;
    dateFnsFormat: string;
  }
) => {
  const { editing, onComplete, onBlur, dateFnsFormat, ...otherProps } = props;

  if (editing) {
    return (
      <DatePicker
        {...otherProps}
        onBlur={(e) => {
          onComplete && onComplete();
          onBlur && onBlur(e);
        }}
      />
    );
  }

  const value = otherProps.value;

  return (
    <Popover trapFocus onClose={() => onComplete && onComplete()}>
      <Popover.Target>
        <Text>{value ? format(value, dateFnsFormat) : ""}</Text>
      </Popover.Target>
      <Popover.Dropdown>
        <DatePicker
          {...otherProps}
          onBlur={(e) => {
            onComplete && onComplete();
            onBlur && onBlur(e);
          }}
        />
      </Popover.Dropdown>
    </Popover>
  );
};
