import { Group, Loader, Text } from "@mantine/core";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";

import { useTags } from "src/utils/hooks/tags/useTags";

import { TableDisplay } from "../table/TableDisplay";
import { tagColumns } from "./tagColumns";

export const TagTable = () => {
  const data = useTags();

  const table = useReactTable({
    data: data.data ? data.data : [],
    getRowId: (data) => data.id,
    columns: tagColumns,
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
        updatedAt: false
      }
    },
    autoResetPageIndex: false
  });

  if (!data.data || data.isLoading) {
    return (
      <Group>
        <Loader />
        <Text>Loading Tags</Text>
      </Group>
    );
  }
  return <TableDisplay table={table} />;
};
