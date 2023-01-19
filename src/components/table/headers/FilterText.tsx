import { TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconX } from "@tabler/icons";
import { useEffect, useState } from "react";

export const FilterText = ({
  filter,
  setFilter
}: {
  filter: unknown;
  setFilter: (updater: string | undefined) => void;
}) => {
  const [value, setValue] = useState<string | undefined>(
    (filter as string) || ""
  );
  const [debouncedValue] = useDebouncedValue(value, 500);

  useEffect(() => setFilter(debouncedValue), [debouncedValue, setFilter]);
  useEffect(() => setValue((filter as string) || ""), [filter, setValue]);

  if (!(typeof filter === "undefined" || typeof filter === "string")) {
    return <></>;
  }
  return (
    <TextInput
      value={value}
      onChange={(e) => {
        setValue(e.currentTarget.value);
      }}
      onSubmit={(e) => console.log(e)}
      placeholder="Filter..."
      rightSection={
        filter ? (
          <IconX
            size={15}
            onClick={() => {
              setValue(undefined);
            }}
          />
        ) : (
          <></>
        )
      }
      size="xs"
    />
  );
};
