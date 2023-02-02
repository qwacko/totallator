import { Checkbox, Group, Text } from "@mantine/core";
import { useAtom, useAtomValue } from "jotai";

import { CustomTd } from "src/components/tableAtom/CustomTd";
import { TableFilterAccountTypeSelect } from "src/components/tableAtom/TableFilterAccountTypeSelect";
import { TableFilterCheckboxInput } from "src/components/tableAtom/TableFilterCheckboxInput";
import { TableFilterDateRangeInput } from "src/components/tableAtom/TableFilterDateRangeInput";
import { TableFilterStringInput } from "src/components/tableAtom/TableFilterStringInput";
import { TableSortButton } from "src/components/tableAtom/TableSortButton";
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
          <Text fw={700}>Actions</Text>
        </CustomTd>
        <CustomTd>
          <Group>
            <Text fw={700}>Title</Text>
            <TableSortButton sortAtom={config.sort} columnId="title" />
          </Group>
        </CustomTd>
        <CustomTd>
          <Group>
            <Text fw={700}>Is Cash</Text>
            <TableSortButton sortAtom={config.sort} columnId="isCash" />
          </Group>
        </CustomTd>
        <CustomTd>
          <Group>
            <Text fw={700}>Is Net Worth</Text>
            <TableSortButton sortAtom={config.sort} columnId="isNetWorth" />
          </Group>
        </CustomTd>
        <CustomTd>
          <Group>
            <Text fw={700}>Account Type</Text>
            <TableSortButton sortAtom={config.sort} columnId="type" />
          </Group>
        </CustomTd>
        <CustomTd>
          <Group>
            <Text fw={700}>Account Group</Text>
            <TableSortButton
              sortAtom={config.sort}
              columnId="accountGroupCombined"
            />
          </Group>
        </CustomTd>
        <CustomTd>
          <Group>
            <Text fw={700}>Start Date</Text>
            <TableSortButton sortAtom={config.sort} columnId="startDate" />
          </Group>
        </CustomTd>
        <CustomTd>
          <Group>
            <Text fw={700}>End Date</Text>
            <TableSortButton sortAtom={config.sort} columnId="endDate" />
          </Group>
        </CustomTd>
        <CustomTd>
          <Group>
            <Text fw={700}>Stats</Text>
          </Group>
        </CustomTd>
      </tr>
      <tr>
        <CustomTd>
          <Group>
            <Checkbox checked={selecting} onChange={toggleSelection} />
          </Group>
        </CustomTd>
        <CustomTd>
          <span></span>
        </CustomTd>
        <CustomTd>
          <TableFilterStringInput filterAtom={config.filter} columnId="title" />
        </CustomTd>
        <CustomTd>
          <TableFilterCheckboxInput
            filterAtom={config.filter}
            columnId="isCash"
          />
        </CustomTd>
        <CustomTd>
          <TableFilterCheckboxInput
            filterAtom={config.filter}
            columnId="isNetWorth"
          />
        </CustomTd>
        <CustomTd>
          <TableFilterAccountTypeSelect
            filterAtom={config.filter}
            columnId="type"
          />
        </CustomTd>
        <CustomTd>
          <TableFilterStringInput
            filterAtom={config.filter}
            columnId="accountGroupCombined"
          />
        </CustomTd>
        <CustomTd>
          <TableFilterDateRangeInput
            filterAtom={config.filter}
            columnId="startDate"
          />
        </CustomTd>
        <CustomTd>
          <TableFilterDateRangeInput
            filterAtom={config.filter}
            columnId="endDate"
          />
        </CustomTd>
        <CustomTd>
          <span></span>
        </CustomTd>
      </tr>
    </>
  );
};
