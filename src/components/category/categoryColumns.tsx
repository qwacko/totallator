import { createColumnHelper } from "@tanstack/react-table";

import type { CategoriesReturnType } from "src/server/trpc/router/_app";

import { dateFilter } from "../table/filters/dateFilter";
import { statusFilter } from "../table/filters/statusFilter";
import { displayHeader } from "../table/headers/displayHeader";
import { selectionCell } from "../table/selectionCell";
import { CategoryTableBulkActions } from "./CategoryTableBulkActions";
import { displayCategoryCell } from "./CategoryTableCell";

const columnHelper = createColumnHelper<CategoriesReturnType>();

export const categoryColumns = [
  columnHelper.display({
    id: "selection",
    header: CategoryTableBulkActions,
    cell: selectionCell,
    enableColumnFilter: false
  }),
  columnHelper.display({
    id: "commands",
    header: displayHeader({ title: "Commands" }),
    cell: displayCategoryCell,
    enableColumnFilter: false
  }),
  columnHelper.accessor("title", {
    header: displayHeader({ title: "Title", filterType: "string" }),
    cell: displayCategoryCell,
    enableColumnFilter: true,
    filterFn: "includesString"
  }),
  columnHelper.accessor("group", {
    header: displayHeader({ title: "Group", filterType: "string" }),
    cell: displayCategoryCell,
    enableColumnFilter: true,
    filterFn: "includesString"
  }),
  columnHelper.accessor("single", {
    header: displayHeader({ title: "Single", filterType: "string" }),
    cell: displayCategoryCell,
    enableColumnFilter: true,
    filterFn: "includesString"
  }),
  columnHelper.accessor("status", {
    header: displayHeader({ title: "Status", filterType: "status" }),
    cell: displayCategoryCell,
    enableColumnFilter: true,
    filterFn: statusFilter("status")
  }),
  columnHelper.accessor("createdAt", {
    header: displayHeader({ title: "Created At", filterType: "date" }),
    enableColumnFilter: true,
    filterFn: dateFilter("createdAt"),
    cell: displayCategoryCell
  }),
  columnHelper.accessor("updatedAt", {
    header: displayHeader({ title: "Updated At", filterType: "date" }),
    enableColumnFilter: true,
    filterFn: dateFilter("updatedAt"),
    cell: displayCategoryCell
  })
];
