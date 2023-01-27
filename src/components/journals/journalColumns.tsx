import { createColumnHelper } from "@tanstack/react-table";

import type { JournalsMergedType } from "src/utils/hooks/journals/helpers/buildMergedData";

import { dateFilter } from "../table/filters/dateFilter";
import { displayHeader } from "../table/headers/displayHeader";
import { selectionCell } from "../table/selectionCell";
import {
  JournalEditingColumnHeader,
  JournalSelectCell
} from "./JournalSelectCell";
import { JournalTableBulkActions } from "./JournalTableBulkActions";
import { DisplayJournalCell } from "./JournalTableCell";

const columnHelper = createColumnHelper<JournalsMergedType>();

export const journalColumns = [
  columnHelper.display({
    id: "selection",
    header: JournalTableBulkActions,
    cell: selectionCell,
    enableColumnFilter: false
  }),
  columnHelper.display({
    id: "selection2",
    header: JournalEditingColumnHeader,
    cell: JournalSelectCell,
    enableColumnFilter: false
  }),
  columnHelper.display({
    id: "commands",
    header: displayHeader({ title: "Commands" }),
    cell: DisplayJournalCell,
    enableColumnFilter: false
  }),
  columnHelper.accessor("date", {
    header: displayHeader({ title: "Date", filterType: "date" }),
    cell: DisplayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString"
  }),
  columnHelper.accessor("accountId", {
    header: displayHeader({
      title: "Account",
      sortKey: "account"
    }),
    cell: DisplayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString"
  }),
  columnHelper.accessor("otherJournals", {
    header: displayHeader({ title: "Payee(s)" }),
    cell: DisplayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString"
  }),
  columnHelper.accessor("description", {
    header: displayHeader({ title: "Description", filterType: "string" }),
    cell: DisplayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString"
  }),
  columnHelper.accessor("amount", {
    header: displayHeader({ title: "Amount" }),
    cell: DisplayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString"
  }),
  columnHelper.accessor("total", {
    header: displayHeader({ title: "Total" }),
    cell: DisplayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString",
    enableSorting: false
  }),
  columnHelper.accessor("categoryId", {
    header: displayHeader({
      title: "Category",
      sortKey: "category"
    }),
    cell: DisplayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString"
  }),
  columnHelper.accessor("tagId", {
    header: displayHeader({ title: "Tag", sortKey: "tag" }),
    cell: DisplayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString"
  }),
  columnHelper.accessor("billId", {
    header: displayHeader({
      title: "Bill",
      sortKey: "bill"
    }),
    cell: DisplayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString"
  }),
  columnHelper.accessor("budgetId", {
    header: displayHeader({
      title: "Budget",
      sortKey: "budget"
    }),
    cell: DisplayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString"
  }),
  columnHelper.accessor("createdAt", {
    header: displayHeader({ title: "Created At", filterType: "date" }),
    enableColumnFilter: true,
    filterFn: dateFilter("createdAt"),
    cell: DisplayJournalCell
  }),
  columnHelper.accessor("updatedAt", {
    header: displayHeader({ title: "Updated At", filterType: "date" }),
    enableColumnFilter: true,
    filterFn: dateFilter("updatedAt"),
    cell: DisplayJournalCell
  })
];
