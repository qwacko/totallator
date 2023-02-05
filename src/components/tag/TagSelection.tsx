import {
  MultiSelect,
  type MultiSelectProps,
  Select,
  type SelectProps
} from "@mantine/core";

import { trpc } from "src/utils/trpc";

const useTagDropdown = (props: {
  accountGroupingId?: string;
  showCombined: boolean;
  includeOnlyAdmin?: boolean;
}) => {
  const { data } = trpc.tags.getDropdown.useQuery(props);
  return data || [];
};

export type TagSelectionProps = Omit<SelectProps, "data"> & {
  accountGroupingId?: string;
  showCombined?: boolean;
  includeOnlyAdmin?: boolean;
};

export const TagSelection = ({
  accountGroupingId,
  showCombined = true,
  includeOnlyAdmin,
  ...props
}: TagSelectionProps) => {
  const filteredTags = useTagDropdown({
    accountGroupingId,
    showCombined,
    includeOnlyAdmin
  });
  return <Select {...props} data={filteredTags} />;
};

export const TagMultiSelection = ({
  accountGroupingId,
  showCombined = true,
  includeOnlyAdmin,
  ...props
}: Omit<MultiSelectProps, "data"> & {
  accountGroupingId?: string;
  showCombined?: boolean;
  includeOnlyAdmin?: boolean;
}) => {
  const filteredTags = useTagDropdown({
    accountGroupingId,
    showCombined,
    includeOnlyAdmin
  });
  return <MultiSelect {...props} data={filteredTags} />;
};
