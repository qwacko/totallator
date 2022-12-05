import { createColumnHelper } from "@tanstack/react-table";
import { displayTagCell } from "./TagTableCell";
import { statusFilter } from "../table/filters/statusFilter";
import { dateFilter } from "../table/filters/dateFilter";
import type { TagsReturnType } from "src/server/trpc/router/_app";
import { displayHeader } from "../table/headers/displayHeader";

const columnHelper = createColumnHelper<TagsReturnType>();

export const tagColumns = [
  columnHelper.display({
    id: "commands",
    header: displayHeader({ title: "Commands" }),
    cell: displayTagCell,
    enableColumnFilter: false,
  }),
  columnHelper.accessor("title", {
    header: displayHeader({ title: "Title", filterType: "string" }),
    cell: displayTagCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("group", {
    header: displayHeader({ title: "Group", filterType: "string" }),
    cell: displayTagCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("single", {
    header: displayHeader({ title: "Single", filterType: "string" }),
    cell: displayTagCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("status", {
    header: displayHeader({ title: "Status", filterType: "status" }),
    cell: displayTagCell,
    enableColumnFilter: true,
    filterFn: statusFilter("status"),
  }),
  columnHelper.accessor("createdAt", {
    header: displayHeader({ title: "Created At", filterType: "date" }),
    enableColumnFilter: true,
    filterFn: dateFilter("createdAt"),
    cell: displayTagCell,
  }),
  columnHelper.accessor("updatedAt", {
    header: displayHeader({ title: "Updated At", filterType: "date" }),
    enableColumnFilter: true,
    filterFn: dateFilter("updatedAt"),
    cell: displayTagCell,
  }),
];
