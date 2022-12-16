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
            checked={column.table.getIsAllPageRowsSelected()}
            indeterminate={column.table.getIsSomePageRowsSelected()}
            onClick={() =>
              column.table.toggleAllPageRowsSelected(
                !column.table.getIsAllPageRowsSelected()
              )
            }
          />
          {children}
        </Group>
      </Center>
    </Stack>
  );
};
