import type { SortType } from "src/components/table/SortButton";
import { trpc } from "src/utils/trpc";

export type billsFilter = {
  includeDisabled?: boolean;
  includeDeleted?: boolean;
  excludeActive?: boolean;
  titleIncludes?: string;
};

export type billsSort = SortType<"title" | "status">;

export const useBills = ({
  filter = {},
  sort = undefined,
}: { filter?: billsFilter; sort?: billsSort } = {}) => {
  const { data: allBills, isLoading } = trpc.bills.get.useQuery();

  const filteredBills = !allBills
    ? []
    : allBills.filter((bill) => {
        let matched = true;

        if (!filter.includeDeleted && bill.deleted) matched = false;
        if (!filter.includeDisabled && bill.disabled) matched = false;
        if (filter.excludeActive && bill.active) matched = false;
        if (filter.titleIncludes) {
          if (
            !bill.title
              .toLocaleLowerCase()
              .includes(filter.titleIncludes.toLocaleLowerCase())
          ) {
            matched = false;
          }
        }

        return matched;
      });

  const bills = filteredBills.sort((a, b) => {
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
    }
    return a.title
      .toLocaleLowerCase()
      .localeCompare(b.title.toLocaleLowerCase());
  });

  return { allBills, isLoading, bills };
};
