import { createColumnHelper } from "@tanstack/react-table";

import type { AccountsReturnType } from "src/server/trpc/router/_app";

import { accountTypeFilter } from "../table/filters/accountTypeFilter";
import { dateFilter } from "../table/filters/dateFilter";
import { statusFilter } from "../table/filters/statusFilter";
import { displayHeader } from "../table/headers/displayHeader";

const columnHelper = createColumnHelper<AccountsReturnType>();

export const accountColumnsView = [
  columnHelper.accessor("title", {
    header: displayHeader({ title: "Title", filterType: "string" }),
    enableColumnFilter: true,
    filterFn: "includesString"
  }),
  columnHelper.accessor("status", {
    header: displayHeader({ title: "Status", filterType: "status" }),
    enableColumnFilter: true,
    filterFn: statusFilter("status")
  }),
  columnHelper.accessor("isNetWorth", {
    enableColumnFilter: true,
    header: displayHeader({ title: "Net Worth", filterType: "boolean" }),
    filterFn: "equals"
  }),
  columnHelper.accessor("isCash", {
    header: displayHeader({ title: "Cash", filterType: "boolean" }),
    enableColumnFilter: true,
    filterFn: "equals"
  }),
  columnHelper.accessor("type", {
    header: displayHeader({ title: "Account Type", filterType: "accountType" }),
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
      filterFn: "includesString"
    }
  ),
  columnHelper.accessor("accountGroup", {
    header: displayHeader({ title: "Account Group", filterType: "string" }),
    enableColumnFilter: true,
    filterFn: "includesString"
  }),
  columnHelper.accessor("accountGroup2", {
    header: displayHeader({ title: "Account Group 2", filterType: "string" }),
    enableColumnFilter: true,
    filterFn: "includesString"
  }),
  columnHelper.accessor("accountGroup3", {
    header: displayHeader({ title: "Account Group 3", filterType: "string" }),
    enableColumnFilter: true,
    filterFn: "includesString"
  }),
  columnHelper.accessor("startDate", {
    header: displayHeader({ title: "Start Date", filterType: "date" }),
    enableColumnFilter: true,
    filterFn: dateFilter("startDate")
  }),
  columnHelper.accessor("endDate", {
    header: displayHeader({ title: "End Date", filterType: "date" }),
    enableColumnFilter: true,
    filterFn: dateFilter("startDate")
  }),
  columnHelper.accessor("createdAt", {
    header: displayHeader({ title: "Created At", filterType: "date" }),
    enableColumnFilter: true,
    filterFn: dateFilter("createdAt")
  }),
  columnHelper.accessor("updatedAt", {
    header: displayHeader({ title: "Updated At", filterType: "date" }),
    enableColumnFilter: true,
    filterFn: dateFilter("updatedAt")
  })
];
