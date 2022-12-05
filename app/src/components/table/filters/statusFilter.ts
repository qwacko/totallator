import type { PrismaStatusEnum } from "@prisma/client";
import { type FilterFn } from "@tanstack/react-table";

export const statusFilter = <T extends Record<string, unknown>>(
  key: keyof T
) => {
  const filterFunction: FilterFn<T> = (row, columnId, value) => {
    const filter = value as
      | PrismaStatusEnum[]
      | PrismaStatusEnum
      | undefined
      | null;
    const status = row.original[key] as PrismaStatusEnum;

    if (filter && typeof filter === "object") {
      if (filter.length > 0) {
        return filter.includes(status);
      }
      return true;
    }
    if (filter) {
      return status === filter;
    }
    return true;
  };
  return filterFunction;
};
