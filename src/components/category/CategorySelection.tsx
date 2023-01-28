import {
  MultiSelect,
  type MultiSelectProps,
  Select,
  type SelectProps
} from "@mantine/core";
import { useMemo } from "react";

import { useCategories } from "src/utils/hooks/categories/useCategories";

const useCategoryDropdown = ({
  accountGroupingId,
  showCombined
}: {
  accountGroupingId?: string;
  showCombined: boolean;
}) => {
  const categories = useCategories();
  const filteredCategories = useMemo(
    () =>
      categories.data
        ? categories.data
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
    [categories.data, accountGroupingId, showCombined]
  );
  return filteredCategories;
};

export type CategorySelectionProps = Omit<SelectProps, "data"> & {
  accountGroupingId?: string;
  showCombined?: boolean;
};

export const CategorySelection = ({
  accountGroupingId,
  showCombined = true,
  ...props
}: CategorySelectionProps) => {
  const filteredCategories = useCategoryDropdown({
    accountGroupingId,
    showCombined
  });
  return <Select {...props} data={filteredCategories} />;
};

export const CategoryMultiSelection = ({
  accountGroupingId,
  showCombined = true,
  ...props
}: Omit<MultiSelectProps, "data"> & {
  accountGroupingId?: string;
  showCombined?: boolean;
}) => {
  const filteredCategories = useCategoryDropdown({
    accountGroupingId,
    showCombined
  });
  return <MultiSelect {...props} data={filteredCategories} />;
};
