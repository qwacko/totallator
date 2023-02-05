import { Autocomplete, type AutocompleteProps } from "@mantine/core";

import { trpc } from "src/utils/trpc";

export const CategorySingleSelection = (
  input: Omit<AutocompleteProps, "data"> & { accountGroupingId: string }
) => {
  const { accountGroupingId, ...autocompleteInput } = input;
  const { data } = trpc.categories.getGroups.useQuery({
    accountGroupingId,
    returnType: "single"
  });

  return <Autocomplete {...autocompleteInput} data={data || []} />;
};
