import { Button, Menu } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons";
import type { HeaderContext } from "@tanstack/react-table";

import type { BillsReturnType } from "src/server/trpc/router/_app";

import { SelectionColumnHeader } from "../table/selectionColumnHeader";

export const BillTableBulkActions = (
  column: HeaderContext<BillsReturnType, unknown>
) => {
  return (
    <>
      <SelectionColumnHeader>
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
