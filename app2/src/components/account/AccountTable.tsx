import { Button, Group, Loader, Stack, Table, Text } from "@mantine/core";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { AppRouterOutputs } from "src/server/trpc/router/_app";
import { useAccounts } from "src/utils/hooks/accounts/useAccounts";
import { AccountTableCell } from "./AccountTableCell";

type AccountsReturnType = AppRouterOutputs["accounts"]["get"][0];

const columnHelper = createColumnHelper<AccountsReturnType>();
const columns = [
  columnHelper.accessor("title", {
    header: "Title",
    cell: (props) => {
      return <AccountTableCell id={props.row.id} column="title" />;
    },
  }),
  columnHelper.accessor("accountGroupCombined", {
    header: "Title",
    enableSorting: true,
    sortingFn: "text",
    enableMultiSort: true,
    sortUndefined: -1,
    enableColumnFilter: true,
    filterFn: "includesString",
    cell: (props) => {
      return (
        <AccountTableCell id={props.row.id} column="accountGroupCombined" />
      );
    },
  }),
];
export const AccountTable = () => {
  const { allAccounts, isLoading } = useAccounts();
  console.log("ALlAccounts", allAccounts);
  const table = useReactTable({
    getRowId: (data) => data.id,
    data: allAccounts || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: true,
    enableMultiSort: true,
    enableColumnFilters: true,
    enableFilters: true,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 1 },
      sorting: [{ id: "title", desc: false }],
    },
  });

  if (!allAccounts || isLoading) {
    return (
      <Group>
        <Loader />
        <Text>Loading Accounts</Text>
      </Group>
    );
  }

  return (
    <Stack>
      <Button
        onClick={() =>
          table.setSorting((data) => {
            if (data.length === 0) {
              return [{ desc: true, id: "accountGroupCombined" }];
            }
            return data.map((item) => ({ ...item, desc: !item.desc }));
          })
        }
      />
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
    </Stack>
  );
};
