import { Autocomplete, type AutocompleteProps } from "@mantine/core";
import { useMemo } from "react";
import { useTags } from "src/utils/hooks/tags/useTags";

export const TagSingleSelection = (
  input: AutocompleteProps & { accountGroupingId: string }
) => {
  const { accountGroupingId, ...autocompleteInput } = input;
  const tags = useTags();
  const groups = useMemo(
    () =>
      [
        ...new Set(
          tags.data
            ? tags.data
                .filter((tag) => tag.accountGroupingId === accountGroupingId)
                .map((tag) => tag.single)
            : []
        ),
      ].sort((a, b) =>
        a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase())
      ),
    [tags, accountGroupingId]
  );

  return <Autocomplete {...autocompleteInput} data={groups} />;
};
