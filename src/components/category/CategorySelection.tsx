import {
  MultiSelect,
  type MultiSelectProps,
  Select,
  type SelectProps
} from "@mantine/core";

import { trpc } from "src/utils/trpc";

const useCategoryDropdown = (props: {
  accountGroupingId?: string;
  showCombined: boolean;
  includeOnlyAdmin?: boolean;
}) => {
  const { data } = trpc.categories.getDropdown.useQuery(props);
  return data || [];
};

export type CategorySelectionProps = Omit<SelectProps, "data"> & {
  accountGroupingId?: string;
  showCombined?: boolean;
  includeOnlyAdmin?: boolean;
};

export const CategorySelection = ({
  accountGroupingId,
  showCombined = true,
  includeOnlyAdmin,
  ...props
}: CategorySelectionProps) => {
  const filteredCategories = useCategoryDropdown({
    accountGroupingId,
    showCombined,
    includeOnlyAdmin
  });
  return <Select {...props} data={filteredCategories} />;
};

export const CategoryMultiSelection = ({
  accountGroupingId,
  showCombined = true,
  includeOnlyAdmin,
  ...props
}: Omit<MultiSelectProps, "data"> & {
  accountGroupingId?: string;
  showCombined?: boolean;
  includeOnlyAdmin?: boolean;
}) => {
  const filteredCategories = useCategoryDropdown({
    accountGroupingId,
    showCombined,
    includeOnlyAdmin
  });
  return <MultiSelect {...props} data={filteredCategories} />;
};
