import { Checkbox, type CheckboxProps, Popover } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";

export const CheckboxCellWithPopoverEdit = (
  props: CheckboxProps & { editing: boolean }
) => {
  const { editing, ...otherProps } = props;
  if (editing) {
    return <Checkbox {...otherProps} />;
  }
  return (
    <Popover trapFocus>
      <Popover.Target>
        <span>{props.checked ? <IconCheck /> : <IconX />}</span>
      </Popover.Target>
      <Popover.Dropdown>
        <Checkbox {...otherProps} />
      </Popover.Dropdown>
    </Popover>
  );
};
