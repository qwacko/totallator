import { Checkbox, Group, Stack, Text } from "@mantine/core";
import { useAtom } from "jotai";

import { type JournalTableConfigAtomReturn } from "src/utils/hooks/journals/useJournalsSimple";

import type { CombinedJournalDataAtomType } from "./CombinedJournalDataAtomType";
import { CustomTd } from "./JournalTableRowDisplay";
import { TableFilterInputAtom } from "./TableFilterInput";
import { TableSortButton } from "./TableSortButton";

export const JournalTableHeaderDisplay = ({
  config,
  journalData
}: {
  config: JournalTableConfigAtomReturn;
  journalData: CombinedJournalDataAtomType;
}) => {
  const [editingRows, setEditingRows] = useAtom(config.editingRowsAtom);
  const [rowIds] = useAtom(journalData.rowIdAtom);
  const editing = editingRows.length > 0;
  const toggleEditing = () => {
    if (editing) {
      setEditingRows([]);
    } else {
      setEditingRows(rowIds);
    }
  };
  return (
    <>
      <tr>
        <CustomTd>
          <Text fw={700}>Edit</Text>
        </CustomTd>
        <CustomTd>
          <Text fw={700}>Info</Text>
        </CustomTd>
        <CustomTd>
          <Group>
            <Text fw={700}>Date</Text>
            <TableSortButton sortAtom={config.sortingAtom} columnId="date" />
          </Group>
        </CustomTd>
        <CustomTd>
          <Group>
            <Text fw={700}>Account</Text>
            <TableSortButton sortAtom={config.sortingAtom} columnId="account" />
          </Group>
        </CustomTd>
        <CustomTd>
          <Stack>
            <Group>
              <Text fw={700}>Payee(s)</Text>
            </Group>
          </Stack>
        </CustomTd>
        <CustomTd>
          <Group>
            <Text fw={700}>Description</Text>
            <TableSortButton
              sortAtom={config.sortingAtom}
              columnId="description"
            />
          </Group>
        </CustomTd>
        <CustomTd>
          <Group>
            <Text fw={700}>Amount</Text>
            <TableSortButton sortAtom={config.sortingAtom} columnId="amount" />
          </Group>
        </CustomTd>
        <CustomTd>
          <Stack>
            <Group>
              <Text fw={700}>Total</Text>
            </Group>
          </Stack>
        </CustomTd>
        <CustomTd>
          <Stack>
            <Group>
              <Text fw={700}>Category</Text>
            </Group>
          </Stack>
        </CustomTd>
        <CustomTd>
          <Stack>
            <Group>
              <Text fw={700}>Tag</Text>
            </Group>
          </Stack>
        </CustomTd>
        <CustomTd>
          <Stack>
            <Group>
              <Text fw={700}>Bill</Text>
            </Group>
          </Stack>
        </CustomTd>
        <CustomTd>
          <Stack>
            <Group>
              <Text fw={700}>Budget</Text>
            </Group>
          </Stack>
        </CustomTd>
      </tr>
      <tr>
        <CustomTd>
          <Checkbox checked={editing} onChange={toggleEditing} />
        </CustomTd>
        <CustomTd />
        <CustomTd>
          <TableFilterInputAtom
            filterAtom={config.filtersAtom}
            columnId="accountId"
          />
        </CustomTd>
        <CustomTd />
        <CustomTd>
          <TableFilterInputAtom
            filterAtom={config.filtersAtom}
            columnId="description"
          />
        </CustomTd>
        <CustomTd />
        <CustomTd />
        <CustomTd>
          <TableFilterInputAtom
            filterAtom={config.filtersAtom}
            columnId="categoryId"
          />
        </CustomTd>
        <CustomTd>
          <TableFilterInputAtom
            filterAtom={config.filtersAtom}
            columnId="tagId"
          />
        </CustomTd>
        <CustomTd>
          <TableFilterInputAtom
            filterAtom={config.filtersAtom}
            columnId="billId"
          />
        </CustomTd>
        <CustomTd>
          <TableFilterInputAtom
            filterAtom={config.filtersAtom}
            columnId="budgetId"
          />
        </CustomTd>
      </tr>
    </>
  );
};
