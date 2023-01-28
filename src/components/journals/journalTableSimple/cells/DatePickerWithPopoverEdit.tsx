import { Popover, Text } from "@mantine/core";
import { DatePicker, type DatePickerProps } from "@mantine/dates";
import { format } from "date-fns";

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
