import { HeaderContext } from "@tanstack/react-table";
import {
  Center,
  Checkbox,
  Stack,
  Text,
  Group,
  Menu,
  Button,
} from "@mantine/core";
import { IconArrowDown } from "@tabler/icons";
import { ReactNode } from "react";

export const SelectionColumnHeader = <T extends unknown, U extends unknown>({
  column,
  children,
}: {
  column: HeaderContext<T, U>;
  children: ReactNode;
}) => {
  return (
    <Stack>
      <Text>Selection</Text>
      <Center>
        <Group>
          <Checkbox
            checked={true}
            onClick={() => column.table.toggleAllPageRowsSelected(true)}
          />
          <Checkbox
            checked={false}
            onClick={() => column.table.toggleAllPageRowsSelected(false)}
          />
          {children}
        </Group>
      </Center>
    </Stack>
  );
};
