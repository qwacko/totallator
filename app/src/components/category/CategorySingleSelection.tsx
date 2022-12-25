import { Autocomplete, type AutocompleteProps } from "@mantine/core";
import { useMemo } from "react";
import { useCategories } from "src/utils/hooks/categories/useCategories";

export const CategorySingleSelection = (
  input: AutocompleteProps & { accountGroupingId: string }
) => {
  const { accountGroupingId, ...autocompleteInput } = input;
  const categories = useCategories();
  const groups = useMemo(
    () =>
      [
        ...new Set(
          categories.data
            ? categories.data
                .filter(
                  (category) => category.accountGroupingId === accountGroupingId
                )
                .map((category) => category.single)
            : []
        ),
      ].sort((a, b) =>
        a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase())
      ),
    [categories, accountGroupingId]
  );

  return <Autocomplete {...autocompleteInput} data={groups} />;
};
