import { Button, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDatabaseExport, IconMenu2 } from "@tabler/icons";
import { useSeedAccountGrouping } from "src/utils/hooks/accountGroupings/useSeedAccountGrouping";
4;
import { useExportData } from "./helpers/useExportData";

export const AccountGroupingMenu = ({
  accountGroupingId,
  admin,
}: {
  accountGroupingId: string;
  admin: boolean;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const seeding = useSeedAccountGrouping({ accountGroupingId });
  const exportData = useExportData({ accountGroupingId });

  return (
    <Menu onClose={close} opened={opened} withinPortal={true}>
      <Menu.Target>
        <Button compact onClick={open}>
          <IconMenu2 size={15} />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Configure</Menu.Label>
        <Menu.Item disabled={!admin}>Configure</Menu.Item>
        <Menu.Item disabled={!admin}>Add User</Menu.Item>
        <Menu.Divider />
        <Menu.Label>Import / Export</Menu.Label>
        <Menu.Item onClick={exportData.exportJSONAll}>
          Export To JSON (All Data)
        </Menu.Item>
        <Menu.Item onClick={exportData.exportExcelAll}>
          Export To Excel (All Data)
        </Menu.Item>
        <Menu.Item onClick={exportData.exportJSONImport}>
          Export To JSON (Import Format)
        </Menu.Item>
        <Menu.Item onClick={exportData.exportExcelImport}>
          Export To Excel (Import Format)
        </Menu.Item>
        <Menu.Item disabled={!admin}>Import From Excel</Menu.Item>
        <Menu.Item disabled={!admin}>Import From JSON</Menu.Item>
        <Menu.Divider />
        <Menu.Label>Other Actions</Menu.Label>
        <Menu.Item disabled={seeding.canSeed || !admin}>
          Remove Linked Items
        </Menu.Item>
        <Menu.Item disabled={!seeding.canSeed || !admin}>
          Delete Account Grouping
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
