import { MultiSelect } from "@mantine/core";
import type { PrismaAccountEnum } from "@prisma/client";

const options: PrismaAccountEnum[] = [
  "Asset",
  "Expense",
  "Income",
  "Liability",
];

export const FilterAccountType = ({
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
        size="xs"
      />
    );
  }

  return <></>;
};
