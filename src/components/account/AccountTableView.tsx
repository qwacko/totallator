import { Group, Loader, Text } from "@mantine/core";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useAccounts } from "src/utils/hooks/accounts/useAccounts";
import { TableDisplay } from "../table/TableDisplay";
import { accountColumnsView } from "./accountColumnsView";

export const AccountTableView = () => {
  const data = useAccounts();

  const table = useReactTable({
    data: data.data ? data.data : [],
    getRowId: (data) => data.id,
    columns: accountColumnsView,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: true,
    enableMultiSort: true,
    enableColumnFilters: true,
    enableFilters: true,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      editing: false,
    },
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

  return <TableDisplay table={table} />;
};
