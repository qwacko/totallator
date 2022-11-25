import { createColumnHelper } from "@tanstack/react-table";
import { displayAccountCell } from "./AccountTableCell";
import { accountTypeFilter } from "../table/filters/accountTypeFilter";
import { statusFilter } from "../table/filters/statusFilter";
import { dateFilter } from "../table/filters/dateFilter";
import type { AccountsReturnType } from "src/server/trpc/router/_app";
import { displayHeader } from "../table/headers/displayHeader";

const columnHelper = createColumnHelper<AccountsReturnType>();

export const accountColumns = [
  columnHelper.accessor("title", {
    header: displayHeader("Title", "string"),
    cell: displayAccountCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("status", {
    header: displayHeader("Status", "status"),
    cell: displayAccountCell,
    enableColumnFilter: true,
    filterFn: statusFilter("status"),
  }),
  columnHelper.accessor("isNetWorth", {
    cell: displayAccountCell,
    header: displayHeader("Net Worth", "boolean"),
    enableColumnFilter: true,
    filterFn: "equals",
  }),
  columnHelper.accessor("isCash", {
    cell: displayAccountCell,
    header: displayHeader("Cash", "boolean"),
    enableColumnFilter: true,
    filterFn: "equals",
  }),
  columnHelper.accessor("type", {
    header: displayHeader("Account Type", "accountType"),
    cell: displayAccountCell,
    enableColumnFilter: true,
    filterFn: accountTypeFilter,
  }),
  columnHelper.accessor(
    (data) =>
      data.type === "Asset" || data.type === "Liability"
        ? data.accountGroupCombined
        : "",
    {
      header: displayHeader("Account Grouping", "string"),
      id: "accountGroupCombined",
      enableColumnFilter: true,
      filterFn: "includesString",
      cell: displayAccountCell,
    }
  ),
  columnHelper.accessor("accountGroup", {
    header: displayHeader("Account Group", "string"),
    cell: displayAccountCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("accountGroup2", {
    header: displayHeader("Account Group 2", "string"),
    cell: displayAccountCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("accountGroup3", {
    header: displayHeader("Account Group 3", "string"),
    cell: displayAccountCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("startDate", {
    header: displayHeader("Start Date", "date"),
    cell: displayAccountCell,
    enableColumnFilter: true,
    filterFn: dateFilter("startDate"),
  }),
  columnHelper.accessor("endDate", {
    header: displayHeader("End Date", "date"),
    cell: displayAccountCell,
    enableColumnFilter: true,
    filterFn: dateFilter("startDate"),
  }),
  columnHelper.accessor("createdAt", {
    header: displayHeader("Crated At", "date"),
    enableColumnFilter: true,
    filterFn: dateFilter("createdAt"),
    cell: displayAccountCell,
  }),
  columnHelper.accessor("updatedAt", {
    header: displayHeader("Updated At", "date"),
    enableColumnFilter: true,
    filterFn: dateFilter("updatedAt"),
    cell: displayAccountCell,
  }),
];
