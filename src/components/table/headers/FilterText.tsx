import { TextInput } from "@mantine/core";
import { IconX } from "@tabler/icons";

export const FilterText = ({
  filter,
  setFilter
}: {
  filter: unknown;
  setFilter: (updater: string | undefined) => void;
}) => {
  if (!(typeof filter === "undefined" || typeof filter === "string")) {
    return <></>;
  }
  return (
    <TextInput
      value={filter || ""}
      onChange={(e) => setFilter(e.currentTarget.value)}
      placeholder="Filter..."
      rightSection={
        filter ? (
          <IconX size={15} onClick={() => setFilter(undefined)} />
        ) : (
          <></>
        )
      }
      size="xs"
    />
  );
};
