import { createColumnHelper } from "@tanstack/react-table";
import { dateFilter } from "../table/filters/dateFilter";
import { displayHeader } from "../table/headers/displayHeader";
import type { JournalsMergedType } from "src/utils/hooks/journals/useJournals";
import { displayJournalCell } from "./JournalTableCell";

const columnHelper = createColumnHelper<JournalsMergedType>();

export const journalColumns = [
  columnHelper.accessor("date", {
    header: displayHeader("Date", "date"),
    cell: displayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("accountId", {
    header: displayHeader("Account", "date"),
    cell: displayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("otherJournals", {
    header: displayHeader("Payee(s)", "date"),
    cell: displayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("description", {
    header: displayHeader("Description", "string"),
    cell: displayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("amount", {
    header: displayHeader("Amount", "string"),
    cell: displayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("total", {
    header: displayHeader("Total", "string"),
    cell: displayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("categoryId", {
    header: displayHeader("Category", "date"),
    cell: displayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),

  columnHelper.accessor("tagId", {
    header: displayHeader("Tag", "date"),
    cell: displayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),

  columnHelper.accessor("billId", {
    header: displayHeader("Bill", "date"),
    cell: displayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),

  columnHelper.accessor("budgetId", {
    header: displayHeader("Budget", "date"),
    cell: displayJournalCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("createdAt", {
    header: displayHeader("Crated At", "date"),
    enableColumnFilter: true,
    filterFn: dateFilter("createdAt"),
    cell: displayJournalCell,
  }),
  columnHelper.accessor("updatedAt", {
    header: displayHeader("Updated At", "date"),
    enableColumnFilter: true,
    filterFn: dateFilter("updatedAt"),
    cell: displayJournalCell,
  }),
];
