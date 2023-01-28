import {
  NumberInput,
  type NumberInputProps,
  Popover,
  Text
} from "@mantine/core";

export const NumberCellWithPopoverEdit = (
  props: NumberInputProps & {
    editing: boolean;
    onComplete?: () => void;
    format: (value: number | bigint) => string;
  }
) => {
  const { editing, onComplete, onBlur, format, ...otherProps } = props;
  if (editing) {
    return (
      <NumberInput
        {...otherProps}
        onBlur={(e) => {
          onComplete && onComplete();
          onBlur && onBlur(e);
        }}
      />
    );
  }

  const value = otherProps.value || 0;

  return (
    <Popover trapFocus onClose={() => onComplete && onComplete()}>
      <Popover.Target>
        <Text color={value < 0 ? "red" : undefined}>{format(value)}</Text>
      </Popover.Target>
      <Popover.Dropdown>
        <NumberInput
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
