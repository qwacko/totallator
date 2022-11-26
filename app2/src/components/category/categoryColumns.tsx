import { createColumnHelper } from "@tanstack/react-table";
import { displayCategoryCell } from "./CategoryTableCell";
import { statusFilter } from "../table/filters/statusFilter";
import { dateFilter } from "../table/filters/dateFilter";
import type { CategoriesReturnType } from "src/server/trpc/router/_app";
import { displayHeader } from "../table/headers/displayHeader";

const columnHelper = createColumnHelper<CategoriesReturnType>();

export const categoryColumns = [
  columnHelper.display({
    id: "commands",
    header: displayHeader("Commands"),
    cell: displayCategoryCell,
    enableColumnFilter: false,
  }),
  columnHelper.accessor("title", {
    header: displayHeader("Title", "string"),
    cell: displayCategoryCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("group", {
    header: displayHeader("Group", "string"),
    cell: displayCategoryCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("single", {
    header: displayHeader("Single", "string"),
    cell: displayCategoryCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("status", {
    header: displayHeader("Status", "status"),
    cell: displayCategoryCell,
    enableColumnFilter: true,
    filterFn: statusFilter("status"),
  }),
  columnHelper.accessor("createdAt", {
    header: displayHeader("Crated At", "date"),
    enableColumnFilter: true,
    filterFn: dateFilter("createdAt"),
    cell: displayCategoryCell,
  }),
  columnHelper.accessor("updatedAt", {
    header: displayHeader("Updated At", "date"),
    enableColumnFilter: true,
    filterFn: dateFilter("updatedAt"),
    cell: displayCategoryCell,
  }),
];
