import { PrismaAccountEnum } from "@prisma/client";
import type { SortType } from "src/components/table/SortButton";
import { trpc } from "src/utils/trpc";

export type accountsFilter = {
  includeDisabled?: boolean;
  includeDeleted?: boolean;
  excludeActive?: boolean;
  titleIncludes?: string;
  typeIncludes?: PrismaAccountEnum[];
  isCash?: boolean;
  isNetWorth?: boolean;
};

export type accountsSort = SortType<"title" | "status" | "type" | "fullTitle">;

export const useAccounts = ({
  filter = {},
  sort = undefined,
}: { filter?: accountsFilter; sort?: accountsSort } = {}) => {
  const { data: allAccounts, isLoading } = trpc.accounts.get.useQuery();

  const filteredAccounts = !allAccounts
    ? []
    : allAccounts.filter((account) => {
        let matched = true;

        if (!filter.includeDeleted && account.deleted) matched = false;
        if (!filter.includeDisabled && account.disabled) matched = false;
        if (filter.excludeActive && account.active) matched = false;
        if (filter.titleIncludes) {
          if (
            !account.title
              .toLocaleLowerCase()
              .includes(filter.titleIncludes.toLocaleLowerCase())
          ) {
            matched = false;
          }
        }
        if (filter.typeIncludes) {
          if (!filter.typeIncludes.includes(account.type)) {
            matched = false;
          }
        }
        if (filter.isCash !== undefined && filter.isCash !== account.isCash)
          matched = false;
        if (
          filter.isNetWorth !== undefined &&
          filter.isNetWorth !== account.isNetWorth
        )
          matched = false;

        return matched;
      });

  const accounts = filteredAccounts.sort((a, b) => {
    if (sort) {
      console.log("Sorting", sort);
      const c = sort.order === "desc" ? b : a;
      const d = sort.order === "desc" ? a : b;

      if (sort.key === "status") {
        return c.status
          .toLocaleLowerCase()
          .localeCompare(d.status.toLocaleLowerCase());
      }

      if (sort.key === "title") {
        return c.title
          .toLocaleLowerCase()
          .localeCompare(d.title.toLocaleLowerCase());
      }
      if (sort.key === "fullTitle") {
        return (c.accountTitleCombined || "")
          .toLocaleLowerCase()
          .localeCompare((d.accountTitleCombined || "").toLocaleLowerCase());
      }
      if (sort.key === "type") {
        return c.type
          .toLocaleLowerCase()
          .localeCompare(d.type.toLocaleLowerCase());
      }
    }
    return a.title
      .toLocaleLowerCase()
      .localeCompare(b.title.toLocaleLowerCase());
  });

  return { allAccounts, isLoading, accounts };
};
