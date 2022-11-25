import {
  Button,
  Center,
  Group,
  Loader,
  Pagination,
  Select,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { PrismaAccountEnum } from "@prisma/client";
import {
  createColumnHelper,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect } from "react";

import type { AppRouterOutputs } from "src/server/trpc/router/_app";
import { useAccounts } from "src/utils/hooks/accounts/useAccounts";
import { FilterText } from "../table/FilterText";
import { SortButtonReactTable } from "../table/SortButtonReactTable";
import { AccountFilter } from "./AccountFilter";
import { AccountFilterAccountType } from "./AccountFilterAccountType";
import { AccountTableCell } from "./AccountTableCell";

type AccountsReturnType = AppRouterOutputs["accounts"]["get"][0];

const accountTypeFilter: FilterFn<AccountsReturnType> = (
  row,
  columnId,
  value,
  addMeta
) => {
  const filter = value as
    | PrismaAccountEnum[]
    | PrismaAccountEnum
    | undefined
    | null;
  const accountType = row.original.type;

  if (filter && typeof filter === "object") {
    if (filter.length > 0) {
      return filter.includes(accountType);
    }
    return true;
  }
  if (filter) {
    return accountType === filter;
  }
  return true;
};

const columnHelper = createColumnHelper<AccountsReturnType>();
const columns = [
  columnHelper.accessor("title", {
    header: "Title",
    cell: (props) => {
      return (
        <AccountTableCell
          id={props.row.id}
          column="title"
          data={props.row.original}
        />
      );
    },
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("type", {
    header: "Type",

    cell: (props) => {
      return (
        <AccountTableCell
          id={props.row.id}
          column="type"
          data={props.row.original}
        />
      );
    },
    enableColumnFilter: true,
    filterFn: accountTypeFilter,
  }),
  columnHelper.accessor("accountGroupCombined", {
    header: "Account Grouping",
    enableSorting: true,
    sortingFn: "text",
    enableMultiSort: true,
    sortUndefined: -1,
    enableColumnFilter: true,
    filterFn: "includesString",
    cell: (props) => {
      return (
        <AccountTableCell
          id={props.row.id}
          column="accountGroupCombined"
          data={props.row.original}
        />
      );
    },
  }),
];
export const AccountTable = () => {
  const data = useAccounts();

  const table = useReactTable({
    data: data.data ? data.data : [],
    getRowId: (data) => data.id,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: true,
    enableMultiSort: true,
    enableColumnFilters: true,
    enableFilters: true,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 1 },
      sorting: [{ id: "title", desc: false }],
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
                  {header.isPlaceholder ? null : (
                    <Stack>
                      <Group>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <SortButtonReactTable
                          sort={table.getState().sorting}
                          setSort={table.setSorting}
                          targetKey={header.column.id}
                          sortable={header.column.getCanSort()}
                        />
                      </Group>
                      <AccountFilter
                        targetKey={header.column.id}
                        filter={header.column.getFilterValue()}
                        setFilter={header.column.setFilterValue}
                      />
                    </Stack>
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
