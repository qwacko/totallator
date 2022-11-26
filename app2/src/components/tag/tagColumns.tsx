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
    header: displayHeader("Commands"),
    cell: displayTagCell,
    enableColumnFilter: false,
  }),
  columnHelper.accessor("title", {
    header: displayHeader("Title", "string"),
    cell: displayTagCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("group", {
    header: displayHeader("Group", "string"),
    cell: displayTagCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("single", {
    header: displayHeader("Single", "string"),
    cell: displayTagCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("status", {
    header: displayHeader("Status", "status"),
    cell: displayTagCell,
    enableColumnFilter: true,
    filterFn: statusFilter("status"),
  }),
  columnHelper.accessor("createdAt", {
    header: displayHeader("Crated At", "date"),
    enableColumnFilter: true,
    filterFn: dateFilter("createdAt"),
    cell: displayTagCell,
  }),
  columnHelper.accessor("updatedAt", {
    header: displayHeader("Updated At", "date"),
    enableColumnFilter: true,
    filterFn: dateFilter("updatedAt"),
    cell: displayTagCell,
  }),
];
