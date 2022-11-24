import { Autocomplete, type AutocompleteProps } from "@mantine/core";
import { useTags } from "src/utils/hooks/tags/useTags";

export const TagSingleSelection = (
  input: AutocompleteProps & { accountGroupingId: string }
) => {
  const { accountGroupingId, ...autocompleteInput } = input;
  const tags = useTags();
  const groups = [
    ...new Set(
      tags.allTags
        ? tags.allTags
            .filter((tag) => tag.accountGroupingId === accountGroupingId)
            .map((tag) => tag.single)
        : []
    ),
  ].sort((a, b) => a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase()));

  return <Autocomplete {...autocompleteInput} data={groups} />;
};
