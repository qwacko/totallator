import { createColumnHelper } from "@tanstack/react-table";
import { displayBudgetCell } from "./BudgetTableCell";
import { statusFilter } from "../table/filters/statusFilter";
import { dateFilter } from "../table/filters/dateFilter";
import type { BudgetsReturnType } from "src/server/trpc/router/_app";
import { displayHeader } from "../table/headers/displayHeader";

const columnHelper = createColumnHelper<BudgetsReturnType>();

export const budgetColumns = [
  columnHelper.accessor("title", {
    header: displayHeader("Title", "string"),
    cell: displayBudgetCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("status", {
    header: displayHeader("Status", "status"),
    cell: displayBudgetCell,
    enableColumnFilter: true,
    filterFn: statusFilter("status"),
  }),
  columnHelper.accessor("createdAt", {
    header: displayHeader("Crated At", "date"),
    enableColumnFilter: true,
    filterFn: dateFilter("createdAt"),
    cell: displayBudgetCell,
  }),
  columnHelper.accessor("updatedAt", {
    header: displayHeader("Updated At", "date"),
    enableColumnFilter: true,
    filterFn: dateFilter("updatedAt"),
    cell: displayBudgetCell,
  }),
];
