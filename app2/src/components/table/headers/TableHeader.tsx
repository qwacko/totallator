import { Group, Stack, Title } from "@mantine/core";
import { type Header, type Table as TableType } from "@tanstack/react-table";
import { SortButtonReactTable } from "./SortButtonReactTable";
import { type FilterTypes, TableFilterInput } from "./TableFilterInput";

export const TableHeader = <T extends Record<string, unknown>>({
  header,
  table,
  title,
  filterType,
}: {
  header: Header<T, unknown>;
  table: TableType<T>;
  title: string;
  filterType?: FilterTypes;
}) => {
  return (
    <Stack align="center">
      <Group>
        <Title order={6}>{title}</Title>
        <SortButtonReactTable
          sort={table.getState().sorting}
          setSort={table.setSorting}
          targetKey={header.column.id}
          sortable={header.column.getCanSort()}
        />
      </Group>
      {filterType && (
        <TableFilterInput
          filter={header.column.getFilterValue()}
          setFilter={header.column.setFilterValue}
          type={filterType}
        />
      )}
    </Stack>
  );
};
