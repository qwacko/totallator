import { Popover } from "@mantine/core";
import type { ReactNode } from "react";

export const PopoverEdit = ({
  editing = false,
  children,
  displayValue
}: {
  displayValue: ReactNode;
  children: ReactNode;
  editing?: boolean;
}) => {
  if (editing) {
    return <>{children}</>;
  }
  return (
    <Popover trapFocus withinPortal>
      <Popover.Target>{displayValue}</Popover.Target>
      <Popover.Dropdown>{children}</Popover.Dropdown>
    </Popover>
  );
};
