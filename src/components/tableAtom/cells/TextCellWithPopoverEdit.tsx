import { Popover, Text, TextInput, type TextInputProps } from "@mantine/core";

export const TextCellWithPopoverEdit = (
  props: TextInputProps & { editing: boolean; onComplete?: () => void }
) => {
  const { editing, onComplete, onBlur, ...otherProps } = props;
  if (editing) {
    return (
      <TextInput
        {...otherProps}
        onBlur={(e) => {
          onComplete && onComplete();
          onBlur && onBlur(e);
        }}
      />
    );
  }
  return (
    <Popover trapFocus onClose={() => onComplete && onComplete()}>
      <Popover.Target>
        <Text>{otherProps.value || ""}</Text>
      </Popover.Target>
      <Popover.Dropdown>
        <TextInput
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
