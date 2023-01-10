import { Button, Menu } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons";
import type { HeaderContext } from "@tanstack/react-table";
import { SelectionColumnHeader } from "../table/selectionColumnHeader";
import type { AccountsReturnType } from "src/server/trpc/router/_app";

export const AccountTableBulkActions = (
  column: HeaderContext<AccountsReturnType, unknown>
) => {
  return (
    <>
      <SelectionColumnHeader column={column}>
        <Menu>
          <Menu.Target>
            <Button compact>
              <IconMenu2 size={15} />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Selection</Menu.Label>
            <Menu.Item
              closeMenuOnClick={false}
              onClick={() => {
                column.table.toggleAllRowsSelected(false);
                column.table.toggleAllPageRowsSelected(true);
              }}
            >
              Select All
            </Menu.Item>
            <Menu.Item
              closeMenuOnClick={false}
              onClick={() => {
                column.table.toggleAllRowsSelected(false);
                column.table.toggleAllPageRowsSelected(false);
              }}
            >
              Clear Selection
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </SelectionColumnHeader>
    </>
  );
};
