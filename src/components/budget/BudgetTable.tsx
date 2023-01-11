import { Group, Loader, Text } from "@mantine/core";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";

import { useBudgets } from "src/utils/hooks/budgets/useBudgets";

import { TableDisplay } from "../table/TableDisplay";
import { budgetColumns } from "./budgetColumns";

export const BudgetTable = () => {
  const data = useBudgets();

  const table = useReactTable({
    data: data.data ? data.data : [],
    getRowId: (data) => data.id,
    columns: budgetColumns,
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
        createdAt: false,
        updatedAt: false
      }
    },
    autoResetPageIndex: false
  });

  if (!data.data || data.isLoading) {
    return (
      <Group>
        <Loader />
        <Text>Loading Budgets</Text>
      </Group>
    );
  }
  return <TableDisplay table={table} />;
};
