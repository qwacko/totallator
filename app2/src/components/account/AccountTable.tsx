import { Center, Group, Loader, Stack, Table, Text } from "@mantine/core";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import type { AppRouterOutputs } from "src/server/trpc/router/_app";
import {
  type accountsFilter,
  type accountsSort,
  useAccounts,
} from "src/utils/hooks/accounts/useAccounts";
import { SortButton } from "../table/SortButton";
import { StatusFilterMenu } from "../table/StatusFilterMenu";
import { TextFilterMenu } from "../table/TextFilterMenu";
import { usePagination, PaginationDisplay } from "../table/usePagination";
import { AccountTableCell } from "./AccountTableCell";
import { AccountTableRow } from "./AccountTableRow";

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
