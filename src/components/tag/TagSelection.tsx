import {
  MultiSelect,
  type MultiSelectProps,
  Select,
  type SelectProps
} from "@mantine/core";
import { useMemo } from "react";

import { useTags } from "src/utils/hooks/tags/useTags";

const useTagDropdown = ({
  accountGroupingId,
  showCombined
}: {
  accountGroupingId?: string;
  showCombined: boolean;
}) => {
  const tags = useTags();
  const filteredTags = useMemo(
    () =>
      tags.data
        ? tags.data
            .filter((item) =>
              accountGroupingId
                ? item.accountGroupingId === accountGroupingId
                : true
            )
            .map((item) =>
              showCombined
                ? {
                    label: item.title,
                    value: item.id
                  }
                : { label: item.single, value: item.id, group: item.group }
            )
            .sort((a, b) => a.label.localeCompare(b.label))
        : [],
    [tags.data, accountGroupingId, showCombined]
  );
  return filteredTags;
};

export const TagSelection = ({
  accountGroupingId,
  showCombined = true,
  ...props
}: Omit<SelectProps, "data"> & {
  accountGroupingId?: string;
  showCombined?: boolean;
}) => {
  const filteredTags = useTagDropdown({
    accountGroupingId,
    showCombined
  });
  return <Select {...props} data={filteredTags} />;
};

export const TagMultiSelection = ({
  accountGroupingId,
  showCombined = true,
  ...props
}: Omit<MultiSelectProps, "data"> & {
  accountGroupingId?: string;
  showCombined?: boolean;
}) => {
  const filteredTags = useTagDropdown({
    accountGroupingId,
    showCombined
  });
  return <MultiSelect {...props} data={filteredTags} />;
};
