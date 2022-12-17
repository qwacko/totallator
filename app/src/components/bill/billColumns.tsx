import { createColumnHelper } from "@tanstack/react-table";
import { displayBillCell } from "./BIllTableCell";
import { statusFilter } from "../table/filters/statusFilter";
import { dateFilter } from "../table/filters/dateFilter";
import type { BillsReturnType } from "src/server/trpc/router/_app";
import { displayHeader } from "../table/headers/displayHeader";
import { BillTableBulkActions } from "./BillTableBulkActions";
import { selectionCell } from "../table/selectionCell";

const columnHelper = createColumnHelper<BillsReturnType>();

export const billColumns = [
  columnHelper.display({
    id: "selection",
    header: BillTableBulkActions,
    cell: selectionCell,
    enableColumnFilter: false,
  }),
  columnHelper.display({
    id: "commands",
    header: displayHeader({ title: "Commands" }),
    cell: displayBillCell,
    enableColumnFilter: false,
  }),
  columnHelper.accessor("title", {
    header: displayHeader({ title: "Title", filterType: "string" }),
    cell: displayBillCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("status", {
    header: displayHeader({ title: "Status", filterType: "status" }),
    cell: displayBillCell,
    enableColumnFilter: true,
    filterFn: statusFilter("status"),
  }),
  columnHelper.accessor("createdAt", {
    header: displayHeader({ title: "Created At", filterType: "date" }),
    enableColumnFilter: true,
    filterFn: dateFilter("createdAt"),
    cell: displayBillCell,
  }),
  columnHelper.accessor("updatedAt", {
    header: displayHeader({ title: "Updated At", filterType: "date" }),
    enableColumnFilter: true,
    filterFn: dateFilter("updatedAt"),
    cell: displayBillCell,
  }),
];
