import { Checkbox, Group, Text } from "@mantine/core";
import { useAtom, useAtomValue } from "jotai";

import { CustomTd } from "src/components/tableAtom/CustomTd";
import { TableFilterStringInput } from "src/components/tableAtom/TableFilterStringInput";
import { TableSortButton } from "src/components/tableAtom/TableSortButton";
import type { TagsTableDataType } from "src/utils/hooks/tags/useTagsTableData";

export const TagTableHeaderDisplay = ({
  config
}: {
  config: TagsTableDataType;
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
            <TableSortButton sortAtom={config.sort} columnId="group" />
          </Group>
        </CustomTd>
        <CustomTd>
          <Group>
            <Text fw={700}>Title</Text>
            <TableSortButton sortAtom={config.sort} columnId="single" />
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
          <TableFilterStringInput filterAtom={config.filter} columnId="group" />
        </CustomTd>
        <CustomTd>
          <TableFilterStringInput
            filterAtom={config.filter}
            columnId="single"
          />
        </CustomTd>
        <CustomTd>
          <span></span>
        </CustomTd>
      </tr>
    </>
  );
};
