import type { PrismaAccountEnum } from "@prisma/client";
import { type FilterFn } from "@tanstack/react-table";

import type { AccountsReturnType } from "src/server/trpc/router/_app";

export const accountTypeFilter: FilterFn<AccountsReturnType> = (
  row,
  columnId,
  value
) => {
  const filter = value as
    | PrismaAccountEnum[]
    | PrismaAccountEnum
    | undefined
    | null;
  const accountType = row.original.type;

  if (filter && typeof filter === "object") {
    if (filter.length > 0) {
      return filter.includes(accountType);
    }
    return true;
  }
  if (filter) {
    return accountType === filter;
  }
  return true;
};
