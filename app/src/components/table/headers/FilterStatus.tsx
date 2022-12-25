import { MultiSelect } from "@mantine/core";
import type { PrismaStatusEnum } from "@prisma/client";

const options: PrismaStatusEnum[] = ["Active", "Disabled", "Deleted"];

export const FilterStatus = ({
  filter,
  setFilter,
}: {
  filter: PrismaStatusEnum[] | PrismaStatusEnum | undefined | null;
  setFilter: (
    updater: PrismaStatusEnum[] | PrismaStatusEnum | undefined | null
  ) => void;
}) => {
  if (typeof filter === "object" || filter === undefined) {
    return (
      <MultiSelect
        value={filter || []}
        onChange={(e) => setFilter(e as PrismaStatusEnum[])}
        data={options}
        placeholder="Filter Status..."
        clearable
        size="xs"
      />
    );
  }

  return <></>;
};
