import { createColumnHelper } from "@tanstack/react-table";

import type { BillsReturnType } from "src/server/trpc/router/_app";

import { dateFilter } from "../table/filters/dateFilter";
import { statusFilter } from "../table/filters/statusFilter";
import { displayHeader } from "../table/headers/displayHeader";
import { selectionCell } from "../table/selectionCell";
import { displayBillCell } from "./BIllTableCell";
import { BillTableBulkActions } from "./BillTableBulkActions";

const columnHelper = createColumnHelper<BillsReturnType>();

export const billColumns = [
  columnHelper.display({
    id: "selection",
    header: BillTableBulkActions,
    cell: selectionCell,
    enableColumnFilter: false
  }),
  columnHelper.display({
    id: "commands",
    header: displayHeader({ title: "Commands" }),
    cell: displayBillCell,
    enableColumnFilter: false
  }),
  columnHelper.accessor("title", {
    header: displayHeader({ title: "Title", filterType: "string" }),
    cell: displayBillCell,
    enableColumnFilter: true,
    filterFn: "includesString"
  }),
  columnHelper.accessor("status", {
    header: displayHeader({ title: "Status", filterType: "status" }),
    cell: displayBillCell,
    enableColumnFilter: true,
    filterFn: statusFilter("status")
  }),
  columnHelper.accessor("createdAt", {
    header: displayHeader({ title: "Created At", filterType: "date" }),
    enableColumnFilter: true,
    filterFn: dateFilter("createdAt"),
    cell: displayBillCell
  }),
  columnHelper.accessor("updatedAt", {
    header: displayHeader({ title: "Updated At", filterType: "date" }),
    enableColumnFilter: true,
    filterFn: dateFilter("updatedAt"),
    cell: displayBillCell
  })
];
