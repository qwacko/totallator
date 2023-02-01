import { createColumnHelper } from "@tanstack/react-table";

import type { useAccounts } from "src/utils/hooks/accounts/useAccounts";

import { accountTypeFilter } from "../table/filters/accountTypeFilter";
import { dateFilter } from "../table/filters/dateFilter";
import { statusFilter } from "../table/filters/statusFilter";
import { displayHeader } from "../table/headers/displayHeader";
import { selectionCell } from "../table/selectionCell";
import { AccountTableBulkActions } from "./AccountTableBulkActions";
import { displayAccountCell } from "./AccountTableCell";

export type AccountColumnDataType = ReturnType<
  typeof useAccounts
>["combinedData"][0];

const columnHelper = createColumnHelper<AccountColumnDataType>();

export const accountColumns = [
  columnHelper.display({
    id: "selection",
    header: AccountTableBulkActions,
    cell: selectionCell,
    enableColumnFilter: false
  }),
  columnHelper.display({
    id: "commands",
    header: displayHeader({ title: "Commands" }),
    cell: displayAccountCell,
    enableColumnFilter: false
  }),
  columnHelper.accessor("title", {
    header: displayHeader({ title: "Title", filterType: "string" }),
    cell: displayAccountCell,
    enableColumnFilter: true,
    filterFn: "includesString"
  }),
  columnHelper.accessor("status", {
    header: displayHeader({ title: "Status", filterType: "status" }),
    cell: displayAccountCell,
    enableColumnFilter: true,
    filterFn: statusFilter("status")
  }),
  columnHelper.accessor("isNetWorth", {
    cell: displayAccountCell,
    header: displayHeader({ title: "Net Worth", filterType: "boolean" }),
    enableColumnFilter: true,
    filterFn: "equals"
  }),
  columnHelper.accessor("isCash", {
    cell: displayAccountCell,
    header: displayHeader({ title: "Cash", filterType: "boolean" }),
    enableColumnFilter: true,
    filterFn: "equals"
  }),
  columnHelper.accessor("type", {
    header: displayHeader({ title: "Account Type", filterType: "accountType" }),
    cell: displayAccountCell,
    enableColumnFilter: true,
    filterFn: accountTypeFilter
  }),
  columnHelper.accessor(
    (data) =>
      data.type === "Asset" || data.type === "Liability"
        ? data.accountGroupCombined
        : "",
    {
      header: displayHeader({
        title: "Account Grouping",
        filterType: "string"
      }),
      id: "accountGroupCombined",
      enableColumnFilter: true,
      filterFn: "includesString",
      cell: displayAccountCell
    }
  ),
  columnHelper.accessor("accountGroup", {
    header: displayHeader({ title: "Account Group", filterType: "string" }),
    cell: displayAccountCell,
    enableColumnFilter: true,
    filterFn: "includesString"
  }),
  columnHelper.accessor("accountGroup2", {
    header: displayHeader({ title: "Account Group 2", filterType: "string" }),
    cell: displayAccountCell,
    enableColumnFilter: true,
    filterFn: "includesString"
  }),
  columnHelper.accessor("accountGroup3", {
    header: displayHeader({ title: "Account Group 3", filterType: "string" }),
    cell: displayAccountCell,
    enableColumnFilter: true,
    filterFn: "includesString"
  }),
  columnHelper.accessor("startDate", {
    header: displayHeader({ title: "Start Date", filterType: "date" }),
    cell: displayAccountCell,
    enableColumnFilter: true,
    filterFn: dateFilter("startDate")
  }),
  columnHelper.accessor("endDate", {
    header: displayHeader({ title: "End Date", filterType: "date" }),
    cell: displayAccountCell
  }),
  columnHelper.accessor("sum", {
    header: displayHeader({ title: "Value" })
  }),
  columnHelper.accessor("createdAt", {
    header: displayHeader({ title: "Created At", filterType: "date" }),
    enableColumnFilter: true,
    filterFn: dateFilter("createdAt"),
    cell: displayAccountCell
  }),
  columnHelper.accessor("updatedAt", {
    header: displayHeader({ title: "Updated At", filterType: "date" }),
    enableColumnFilter: true,
    filterFn: dateFilter("updatedAt"),
    cell: displayAccountCell
  })
];
