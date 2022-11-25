import {
  Center,
  Group,
  Loader,
  Pagination,
  Select,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useAccounts } from "src/utils/hooks/accounts/useAccounts";
import { accountColumns } from "./accountColumns";

export const AccountTable = () => {
  const data = useAccounts();

  const table = useReactTable({
    data: data.data ? data.data : [],
    getRowId: (data) => data.id,
    columns: accountColumns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: true,
    enableMultiSort: true,
    enableColumnFilters: true,
    enableFilters: true,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 20 },
      sorting: [{ id: "title", desc: false }],
      columnVisibility: {
        accountGroup: false,
        accountGroup2: false,
        accountGroup3: false,
        createdAt: false,
        updatedAt: false,
      },
    },
    autoResetPageIndex: false,
  });

  if (!data.data || data.isLoading) {
    return (
      <Group>
        <Loader />
        <Text>Loading Accounts</Text>
      </Group>
    );
  }

  const paginationInfo = table.getState().pagination;

  console.log("Filters", table.getState().columnFilters);

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
