import { createColumnHelper } from "@tanstack/react-table";
import { dateFilter } from "../table/filters/dateFilter";
import { displayHeader } from "../table/headers/displayHeader";
import type { JournalsMergedType } from "src/utils/hooks/journals/useJournals";
import { displayJournalCell } from "./JournalTableCell";
import { selectionCell } from "../table/selectionCell";
import { JournalTableBulkActions } from "./JournalTableBulkActions";

const columnHelper = createColumnHelper<JournalsMergedType>();

export const journalColumns = [
  columnHelper.display({
    id: "selection",
    header: JournalTableBulkActions,
    cell: selectionCell,
    enableColumnFilter: false,
  }),
  columnHelper.display({
    id: "commands",
    header: displayHeader({ title: "Commands" }),
    cell: displayJournalCell,
    enableColumnFilter: false,
  }),
  columnHelper.accessor("date", {
    header: displayHeader({ title: "Date", filterType: "date" }),
    cell: displayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("accountId", {
    header: displayHeader({
      title: "Account",
      sortKey: "account",
    }),
    cell: displayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("otherJournals", {
    header: displayHeader({ title: "Payee(s)" }),
    cell: displayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("description", {
    header: displayHeader({ title: "Description", filterType: "string" }),
    cell: displayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("amount", {
    header: displayHeader({ title: "Amount" }),
    cell: displayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("total", {
    header: displayHeader({ title: "Total" }),
    cell: displayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString",
    enableSorting: false,
  }),
  columnHelper.accessor("categoryId", {
    header: displayHeader({
      title: "Category",
      sortKey: "category",
    }),
    cell: displayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("tagId", {
    header: displayHeader({ title: "Tag", sortKey: "tag" }),
    cell: displayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("billId", {
    header: displayHeader({
      title: "Bill",
      sortKey: "bill",
    }),
    cell: displayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("budgetId", {
    header: displayHeader({
      title: "Budget",
      sortKey: "budget",
    }),
    cell: displayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("createdAt", {
    header: displayHeader({ title: "Created At", filterType: "date" }),
    enableColumnFilter: true,
    filterFn: dateFilter("createdAt"),
    cell: displayJournalCell,
  }),
  columnHelper.accessor("updatedAt", {
    header: displayHeader({ title: "Updated At", filterType: "date" }),
    enableColumnFilter: true,
    filterFn: dateFilter("updatedAt"),
    cell: displayJournalCell,
  }),
];
