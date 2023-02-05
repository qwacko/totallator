import { Autocomplete, type AutocompleteProps } from "@mantine/core";

import { trpc } from "src/utils/trpc";

export const CategoryGroupSelection = (
  input: Omit<AutocompleteProps, "data"> & { accountGroupingId: string }
) => {
  const { accountGroupingId, ...autocompleteInput } = input;
  const { data } = trpc.categories.getGroups.useQuery({
    accountGroupingId,
    returnType: "group"
  });

  return <Autocomplete {...autocompleteInput} data={data || []} />;
};
