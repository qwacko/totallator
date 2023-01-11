import { Group, Text } from "@mantine/core";
import type { ReactNode } from "react";

export const SelectionColumnHeader = ({
  children
}: {
  children: ReactNode;
}) => {
  return (
    <Group>
      <Text>Selection</Text>
      {children}
    </Group>
  );
};
