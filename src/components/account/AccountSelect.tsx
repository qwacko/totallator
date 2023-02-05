import {
  MultiSelect,
  type MultiSelectProps,
  Select,
  type SelectProps
} from "@mantine/core";

import { PrismaAccountTypeEnumWritable } from "src/utils/validation/PrismaAccountTypeEnumValidation";

export const AccountSelect = (props: Omit<SelectProps, "data">) => {
  return <Select {...props} data={PrismaAccountTypeEnumWritable} />;
};

export const AccountMultiSelect = (props: Omit<MultiSelectProps, "data">) => {
  return <MultiSelect {...props} data={PrismaAccountTypeEnumWritable} />;
};
