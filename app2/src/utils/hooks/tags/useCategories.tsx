import type { SortType } from "src/components/table/SortButton";
import { trpc } from "src/utils/trpc";

export type catgoriesFilter = {
  includeDisabled?: boolean;
  includeDeleted?: boolean;
  excludeActive?: boolean;
  titleIncludes?: string;
  groupIncludes?: string;
  singleIncludes?: string;
};

export type categoriesSort = SortType<"title" | "group" | "single" | "status">;

export const useCategories = ({
  filter = {},
  sort = undefined,
}: { filter?: catgoriesFilter; sort?: categoriesSort } = {}) => {
  const { data: allCategories, isLoading } = trpc.categories.get.useQuery();

  const filteredCategories = !allCategories
    ? []
    : allCategories.filter((category) => {
        let matched = true;

        if (!filter.includeDeleted && category.deleted) matched = false;
        if (!filter.includeDisabled && category.disabled) matched = false;
        if (filter.excludeActive && category.active) matched = false;
        if (filter.titleIncludes) {
          if (
            !category.title
              .toLocaleLowerCase()
              .includes(filter.titleIncludes.toLocaleLowerCase())
          ) {
            matched = false;
          }
        }
        if (filter.groupIncludes) {
          if (
            !category.group
              .toLocaleLowerCase()
              .includes(filter.groupIncludes.toLocaleLowerCase())
          ) {
            matched = false;
          }
        }
        if (filter.singleIncludes) {
          if (
            !category.single
              .toLocaleLowerCase()
              .includes(filter.singleIncludes.toLocaleLowerCase())
          ) {
            matched = false;
          }
        }

        return matched;
      });

  const categories = filteredCategories.sort((a, b) => {
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

      if (sort.key === "group") {
        return c.group
          .toLocaleLowerCase()
          .localeCompare(d.group.toLocaleLowerCase());
      }

      if (sort.key === "single") {
        return c.single
          .toLocaleLowerCase()
          .localeCompare(d.single.toLocaleLowerCase());
      }
    }
    return a.title
      .toLocaleLowerCase()
      .localeCompare(b.title.toLocaleLowerCase());
  });

  return { allCategories, isLoading, categories };
};
