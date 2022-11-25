import { MultiSelect, TextInput } from "@mantine/core";
import { PrismaAccountEnum } from "@prisma/client";
import { IconX } from "@tabler/icons";
import {
  ColumnFiltersState,
  FiltersTableState,
  Updater,
} from "@tanstack/react-table";

const options: PrismaAccountEnum[] = [
  "Asset",
  "Expense",
  "Income",
  "Liability",
];

export const AccountFilterAccountType = ({
  filter,
  setFilter,
}: {
  filter: PrismaAccountEnum[] | PrismaAccountEnum | undefined | null;
  setFilter: (
    updater: PrismaAccountEnum[] | PrismaAccountEnum | undefined | null
  ) => void;
}) => {
  if (typeof filter === "object" || filter === undefined) {
    return (
      <MultiSelect
        value={filter || []}
        onChange={(e) => setFilter(e as PrismaAccountEnum[])}
        data={options}
        placeholder="Filter Account Type..."
        clearable
      />
    );
  }

  return <></>;
};
