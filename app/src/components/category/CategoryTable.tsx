import { Group, Loader, Text } from "@mantine/core";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCategories } from "src/utils/hooks/categories/useCategories";
import { TableDisplay } from "../table/TableDisplay";
import { categoryColumns } from "./categoryColumns";

export const CategoryTable = () => {
  const data = useCategories();

  const table = useReactTable({
    data: data.data ? data.data : [],
    getRowId: (data) => data.id,
    columns: categoryColumns,
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
        group: false,
        single: false,
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
        <Text>Loading Categories</Text>
      </Group>
    );
  }
  return <TableDisplay table={table} />;
};
