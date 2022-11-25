import { Center, Group, Pagination, Select, Stack, Table } from "@mantine/core";
import { flexRender, type Table as TableType } from "@tanstack/react-table";
import type { AllReturnTypes } from "src/server/trpc/router/_app";

export const TableDisplay = <T extends AllReturnTypes>({
  table,
}: {
  table: TableType<T>;
}) => {
  const paginationInfo = table.getState().pagination;

  return (
    <Stack>
      <Table horizontalSpacing={2} verticalSpacing={2}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </Table>
      <Center>
        <Group>
          <Pagination
            page={paginationInfo.pageIndex + 1}
            total={table.getPageCount()}
            onChange={(newValue) => table.setPageIndex(() => newValue - 1)}
          />
          <Select
            value={paginationInfo.pageSize.toString()}
            data={[
              { label: "1 Row", value: "1" },
              { label: "10 Rows", value: "10" },
              { label: "20 Rows", value: "20" },
            ]}
            onChange={(newValue) => table.setPageSize(Number(newValue))}
          />
        </Group>
      </Center>
    </Stack>
  );
};
