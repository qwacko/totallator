import type { SortType } from "src/components/table/SortButton";
import { trpc } from "src/utils/trpc";

export type budgetsFilter = {
  includeDisabled?: boolean;
  includeDeleted?: boolean;
  excludeActive?: boolean;
  titleIncludes?: string;
};

export type budgetsSort = SortType<"title" | "status">;

export const useBudgets = ({
  filter = {},
  sort = undefined,
}: { filter?: budgetsFilter; sort?: budgetsSort } = {}) => {
  const { data: allBudgets, isLoading } = trpc.budgets.get.useQuery();

  const filteredBudgets = !allBudgets
    ? []
    : allBudgets.filter((budget) => {
        let matched = true;

        if (!filter.includeDeleted && budget.deleted) matched = false;
        if (!filter.includeDisabled && budget.disabled) matched = false;
        if (filter.excludeActive && budget.active) matched = false;
        if (filter.titleIncludes) {
          if (
            !budget.title
              .toLocaleLowerCase()
              .includes(filter.titleIncludes.toLocaleLowerCase())
          ) {
            matched = false;
          }
        }

        return matched;
      });

  const budgets = filteredBudgets.sort((a, b) => {
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

  return { allBudgets, isLoading, budgets };
};
