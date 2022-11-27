import { Select, type SelectProps } from "@mantine/core";
import { useMemo } from "react";
import { useCategories } from "src/utils/hooks/categories/useCategories";

export const CategorySelection = ({
  accountGroupingId,
  showCombined = true,
  ...props
}: SelectProps & {
  accountGroupingId: string;
  showCombined: boolean;
}) => {
  const categories = useCategories();
  const filteredCategories = useMemo(
    () =>
      categories.data
        ? categories.data
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
    [categories.data, accountGroupingId, showCombined]
  );

  return <Select {...props} data={filteredCategories} />;
};
