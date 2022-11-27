import { Select, type SelectProps } from "@mantine/core";
import { useMemo } from "react";
import { useTags } from "src/utils/hooks/tags/useTags";

export const TagSelection = ({
  accountGroupingId,
  showCombined = true,
  ...props
}: SelectProps & {
  accountGroupingId: string;
  showCombined: boolean;
}) => {
  const tags = useTags();
  const filteredTags = useMemo(
    () =>
      tags.data
        ? tags.data
            .filter((item) => item.accountGroupingId === accountGroupingId)
            .map((item) =>
              showCombined
                ? {
                    label: item.title,
                    value: item.id,
                  }
                : { label: item.single, value: item.id, group: item.group }
            )
        : [],
    [tags.data, accountGroupingId, showCombined]
  );

  return <Select {...props} data={filteredTags} />;
};
