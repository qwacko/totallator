import { Autocomplete, type AutocompleteProps } from "@mantine/core";
import { useCategories } from "src/utils/hooks/categories/useCategories";

export const CategoryGroupSelection = (
  input: AutocompleteProps & { accountGroupingId: string }
) => {
  const { accountGroupingId, ...autocompleteInput } = input;
  const tags = useCategories();
  const groups = [
    ...new Set(
      tags.allCategories
        ? tags.allCategories
            .filter(
              (category) => category.accountGroupingId === accountGroupingId
            )
            .map((category) => category.group)
        : []
    ),
  ].sort((a, b) => a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase()));

  return <Autocomplete {...autocompleteInput} data={groups} />;
};
