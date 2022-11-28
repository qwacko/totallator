import { Group, Loader, Text } from "@mantine/core";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useJournals } from "src/utils/hooks/journals/useJournals";
import { TableDisplay } from "../table/TableDisplay";
import { journalColumns } from "./journalColumns";

export const JournalTable = () => {
  const data = useJournals();

  console.log("Filters", data.tableState.filters);
  console.log("Page Count", data.tableState.pageCount);

  const table = useReactTable({
    data: data.data.mergedData ? data.data.mergedData : [],
    getRowId: (data) => data.id,
    columns: journalColumns,
    getCoreRowModel: getCoreRowModel(),

    //State
    state: {
      sorting: data.tableState.sorting,
      columnFilters: data.tableState.filters,
      pagination: data.tableState.pagination,
    },

    //Sorting
    enableSorting: true,
    enableMultiSort: true,
    manualSorting: true,
    onSortingChange: data.tableState.setSorting,

    //Filtering
    enableColumnFilters: true,
    enableFilters: true,
    manualFiltering: true,
    onColumnFiltersChange: data.tableState.setFilters,

    //Pagination
    manualPagination: true,
    onPaginationChange: data.tableState.setPagination,
    pageCount: data.tableState.pageCount,

    //Initial State
    initialState: {
      pagination: { pageSize: 20, pageIndex: 1 },
      sorting: [{ id: "description", desc: false }],
      columnVisibility: {
        createdAt: false,
        updatedAt: false,
      },
    },
    autoResetPageIndex: false,
    autoResetAll: false,
  });

  if (!data.data || data.data.isLoading) {
    return (
      <Group>
        <Loader />
        <Text>Loading Journals</Text>
      </Group>
    );
  }
  return <TableDisplay table={table} />;
};
