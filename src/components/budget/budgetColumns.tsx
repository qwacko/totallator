import { createColumnHelper } from "@tanstack/react-table";

import type { BudgetsReturnType } from "src/server/trpc/router/_app";

import { dateFilter } from "../table/filters/dateFilter";
import { statusFilter } from "../table/filters/statusFilter";
import { displayHeader } from "../table/headers/displayHeader";
import { selectionCell } from "../table/selectionCell";
import { BudgetTableBulkActions } from "./BudgetTableBulkActions";
import { displayBudgetCell } from "./BudgetTableCell";

const columnHelper = createColumnHelper<BudgetsReturnType>();

export const budgetColumns = [
  columnHelper.display({
    id: "selection",
    header: BudgetTableBulkActions,
    cell: selectionCell,
    enableColumnFilter: false
  }),
  columnHelper.display({
    id: "commands",
    header: displayHeader({ title: "Commands" }),
    cell: displayBudgetCell,
    enableColumnFilter: false
  }),
  columnHelper.accessor("title", {
    header: displayHeader({ title: "Title", filterType: "string" }),
    cell: displayBudgetCell,
    enableColumnFilter: true,
    filterFn: "includesString"
  }),
  columnHelper.accessor("status", {
    header: displayHeader({ title: "Status", filterType: "status" }),
    cell: displayBudgetCell,
    enableColumnFilter: true,
    filterFn: statusFilter("status")
  }),
  columnHelper.accessor("createdAt", {
    header: displayHeader({ title: "Created At", filterType: "date" }),
    enableColumnFilter: true,
    filterFn: dateFilter("createdAt"),
    cell: displayBudgetCell
  }),
  columnHelper.accessor("updatedAt", {
    header: displayHeader({ title: "Updated At", filterType: "date" }),
    enableColumnFilter: true,
    filterFn: dateFilter("updatedAt"),
    cell: displayBudgetCell
  })
];
