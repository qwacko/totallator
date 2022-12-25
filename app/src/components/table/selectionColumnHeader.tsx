import { HeaderContext } from "@tanstack/react-table";
import { Center, Checkbox, Stack, Text, Group } from "@mantine/core";
import { ReactNode } from "react";

export const SelectionColumnHeader = <T extends unknown, U extends unknown>({
  column,
  children,
}: {
  column: HeaderContext<T, U>;
  children: ReactNode;
}) => {
  return (
    <Group>
      <Text>Selection</Text>
      {children}
    </Group>
  );
};
