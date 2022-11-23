import type { SortType } from "src/components/table/SortButton";
import { trpc } from "src/utils/trpc";

export type tagsFilter = {
  includeDisabled?: boolean;
  includeDeleted?: boolean;
  excludeActive?: boolean;
  titleIncludes?: string;
  groupIncludes?: string;
  singleIncludes?: string;
};

export type tagsSort = SortType<"title" | "group" | "single" | "status">;

export const useTags = ({
  filter = {},
  sort = undefined,
}: { filter?: tagsFilter; sort?: tagsSort } = {}) => {
  const { data: allTags, isLoading } = trpc.tags.get.useQuery();

  const filteredTags = !allTags
    ? []
    : allTags.filter((tag) => {
        let matched = true;

        if (!filter.includeDeleted && tag.deleted) matched = false;
        if (!filter.includeDisabled && tag.disabled) matched = false;
        if (filter.excludeActive && tag.active) matched = false;
        if (filter.titleIncludes) {
          if (
            !tag.title
              .toLocaleLowerCase()
              .includes(filter.titleIncludes.toLocaleLowerCase())
          ) {
            matched = false;
          }
        }
        if (filter.groupIncludes) {
          if (
            !tag.group
              .toLocaleLowerCase()
              .includes(filter.groupIncludes.toLocaleLowerCase())
          ) {
            matched = false;
          }
        }
        if (filter.singleIncludes) {
          if (
            !tag.single
              .toLocaleLowerCase()
              .includes(filter.singleIncludes.toLocaleLowerCase())
          ) {
            matched = false;
          }
        }

        return matched;
      });

  const tags = filteredTags.sort((a, b) => {
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

  return { allTags, isLoading, tags };
};
