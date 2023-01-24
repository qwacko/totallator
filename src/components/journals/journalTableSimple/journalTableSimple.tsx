import { Group, Pagination, Select, Stack, Table, Text } from "@mantine/core";
import type { ReactNode } from "react";

import { useJournalsSimple } from "src/utils/hooks/journals/useJournalsSimple";
import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";

export const JournalTableSimple = ({
  filters
}: {
  filters: JournalFilterValidationInputType[];
}) => {
  const data = useJournalsSimple({ externalFilters: filters });

  const header = (
    <td>
      <Text>Header</Text>
    </td>
  );
  const rowDisplay = (rowData: (typeof data.data.mergedData)[0]) => (
    <td>
      <Text>{rowData.id}</Text>
    </td>
  );

  return (
    <Stack>
      <TableSimple
        rows={data.data.mergedData}
        header={header}
        row={rowDisplay}
      />
      <Group>
        <Pagination
          page={data.pagination.pageIndex + 1}
          total={data.data.data?.count || 0}
          onChange={(newValue) =>
            data.setPagination({ ...data.pagination, pageIndex: newValue - 1 })
          }
        />
        <Select
          value={data.pagination.pageSize.toString()}
          data={[
            { label: "1 Row", value: "1" },
            { label: "10 Rows", value: "10" },
            { label: "20 Rows", value: "20" }
          ]}
          onChange={(newValue) =>
            data.setPagination({
              ...data.pagination,
              pageSize: Number(newValue)
            })
          }
        />
      </Group>
    </Stack>
  );
};

const TableSimple = <T extends { id: string }>({
  rows,
  header,
  row
}: {
  rows: T[];
  header: ReactNode;
  row: (rowData: T) => ReactNode;
}) => {
  return (
    <Stack>
      <Table horizontalSpacing={2} verticalSpacing={2}>
        <thead>
          <tr>{header}</tr>
        </thead>
        <tbody>
          {rows.map((currentRow) => (
            <tr key={currentRow.id}>{row(currentRow)}</tr>
          ))}
        </tbody>
      </Table>
    </Stack>
  );
};
