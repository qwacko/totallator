import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";

import { useAccountsWithStatsAtom } from "src/utils/hooks/accounts/useAccountsAtom";

import { TableDisplay } from "../table/TableDisplay";
import { accountColumns } from "./accountColumns";

export const AccountTable = () => {
  const data = useAccountsWithStatsAtom();

  const table = useReactTable({
    data,
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
        updatedAt: false
      }
    },
    autoResetPageIndex: false
  });

  return <TableDisplay table={table} />;
};
