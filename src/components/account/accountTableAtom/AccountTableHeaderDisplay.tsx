import { Checkbox, Group, Text } from "@mantine/core";
import { useAtom, useAtomValue } from "jotai";

import { TableFilterInputAtom } from "src/components/journals/journalTableSimple/TableFilterInput";
import { CustomTd } from "src/components/tableAtom/CustomTd";
import type { AccountsTableDataType } from "src/utils/hooks/accounts/useAccountsTableData";

export const AccountTableHeaderDisplay = ({
  config
}: {
  config: AccountsTableDataType;
}) => {
  const rowIds = useAtomValue(config.displayIds);
  const [selectedRows, setSelectedRows] = useAtom(config.selectionAtom);
  const selecting = selectedRows.length > 0;
  const toggleSelection = () => {
    if (selecting) {
      setSelectedRows([]);
    } else {
      setSelectedRows(rowIds);
    }
  };

  //   const rowIds = useAtomValue(config.displayIds);
  //   const [editingRows, setEditingRows] = useAtom(config.editingRowsAtom);
  //   const [rowIds] = useAtom(journalData.rowIdAtom);
  //   const editing = editingRows.length > 0;
  //   const toggleEditing = () => {
  //     if (editing) {
  //       setEditingRows([]);
  //     } else {
  //       setEditingRows(rowIds);
  //     }
  //   };

  //   const [selectedRows, setSelectedRows] = useAtom(config.selectedRowsAtom);
  //   const selecting = selectedRows.length > 0;
  //   const toggleSelection = () => {
  //     if (selecting) {
  //       setSelectedRows([]);
  //     } else {
  //       setSelectedRows(rowIds);
  //     }
  //   };

  return (
    <>
      <tr>
        <CustomTd>
          <Text fw={700}>Select</Text>
        </CustomTd>
        <CustomTd>
          <Text fw={700}>Title</Text>
        </CustomTd>
      </tr>
      <tr>
        <CustomTd>
          <Group>
            <Checkbox checked={selecting} onChange={toggleSelection} />
          </Group>
        </CustomTd>
        <CustomTd>
          <TableFilterInputAtom filterAtom={config.filter} columnId="title" />
        </CustomTd>
      </tr>
    </>
  );
};
