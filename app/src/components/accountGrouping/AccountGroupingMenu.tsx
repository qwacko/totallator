import { Button, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconEdit,
  IconFileExport,
  IconMenu2,
  IconPlus,
  IconTableExport,
  IconTrash,
  IconTree,
  IconUnlink,
} from "@tabler/icons";
import { useSeedAccountGrouping } from "src/utils/hooks/accountGroupings/useSeedAccountGrouping";
import type { AccountGroupingReturnSingle } from "./AccountGroupingCard";
import { AccountGroupingDelete } from "./AccountGroupingDelete";
import { AccountGroupingDeleteLinked } from "./AccountGroupingDeleteLinked";
import { AccountGroupingEditPopup } from "./AccountGroupingEditForm";
import { AccountGroupingAddUserPopup } from "./AcountGroupingAddUsrer";
4;
import { useExportData } from "./helpers/useExportData";

export const AccountGroupingMenu = ({
  data,
}: {
  data: AccountGroupingReturnSingle;
}) => {
  const accountGroupingId = data.id;
  const admin = data.userIsAdmin;
  const [opened, { open, close }] = useDisclosure(false);
  const [editOpened, { open: editOpen, close: editClose }] =
    useDisclosure(false);
  const [addOpened, { open: addOpen, close: addClose }] = useDisclosure(false);
  const [delLinkedOpened, { open: delLinkedOpen, close: delLinkedClose }] =
    useDisclosure(false);
  const [delOpened, { open: delOpen, close: delClose }] = useDisclosure(false);
  const seeding = useSeedAccountGrouping({ accountGroupingId });
  const exportData = useExportData({ accountGroupingId });

  return (
    <>
      <AccountGroupingEditPopup
        data={data}
        close={editClose}
        opened={editOpened}
      />
      <AccountGroupingAddUserPopup
        data={data}
        close={addClose}
        opened={addOpened}
      />
      <AccountGroupingDeleteLinked
        data={data}
        opened={delLinkedOpened}
        close={delLinkedClose}
      />
      <AccountGroupingDelete data={data} opened={delOpened} close={delClose} />

      <Menu onClose={close} opened={opened} withinPortal={true}>
        <Menu.Target>
          <Button compact onClick={open}>
            <IconMenu2 size={15} />
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Configure</Menu.Label>
          <Menu.Item
            disabled={!admin}
            onClick={editOpen}
            icon={<IconEdit size={15} />}
          >
            Edit
          </Menu.Item>
          <Menu.Item
            disabled={!admin}
            icon={<IconPlus size={15} />}
            onClick={addOpen}
          >
            Add User
          </Menu.Item>

          <Menu.Item
            disabled={!admin || !seeding.canSeed}
            icon={<IconTree size={15} />}
            onClick={() => seeding.seed(50)}
          >
            Seed With Data
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label>Export</Menu.Label>
          <Menu.Item
            onClick={exportData.exportJSONAll}
            icon={<IconFileExport size={15} />}
          >
            JSON (All Data)
          </Menu.Item>
          <Menu.Item
            onClick={exportData.exportJSONImport}
            icon={<IconFileExport size={15} />}
          >
            JSON (Import Format)
          </Menu.Item>
          <Menu.Item
            onClick={exportData.exportExcelAll}
            icon={<IconTableExport size={15} />}
          >
            Excel (All Data)
          </Menu.Item>
          <Menu.Item
            onClick={exportData.exportExcelImport}
            icon={<IconTableExport size={15} />}
          >
            Excel (Import Format)
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label>Import</Menu.Label>
          <Menu.Item disabled={!admin}>Import From Excel</Menu.Item>
          <Menu.Item disabled={!admin}>Import From JSON</Menu.Item>
          <Menu.Divider />
          <Menu.Label>Other Actions</Menu.Label>
          <Menu.Item
            disabled={seeding.canSeed || !admin}
            onClick={delLinkedOpen}
            icon={<IconUnlink size={15} />}
            color="red"
          >
            Remove Linked Items
          </Menu.Item>
          <Menu.Item
            disabled={!seeding.canSeed || !admin}
            onClick={delOpen}
            icon={<IconTrash size={15} />}
            color="red"
          >
            Delete Account Grouping
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};