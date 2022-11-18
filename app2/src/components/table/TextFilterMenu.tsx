import { Button, Menu, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMenu2 } from "@tabler/icons";
import { useState } from "react";

export const TextFilterMenu = <T extends Record<string, unknown>>({
  filter,
  setFilter,
  targetKey,
}: {
  filter: T;
  setFilter: (data: T) => void;
  targetKey: keyof T;
}) => {
  const currentValue = filter[targetKey] as string | undefined;
  const [textFilter, setTextFilter] = useState<string | undefined>();

  const [opened, { open, close }] = useDisclosure(false);

  const openInternal = () => {
    setTextFilter(currentValue);
    open();
  };

  const setExternalFilter = (value: string | undefined) => {
    setFilter({ ...filter, [targetKey]: value });
  };

  return (
    <Menu onOpen={openInternal} onClose={close} opened={opened}>
      <Menu.Target>
        <Button
          variant={currentValue ? "light" : "white"}
          onClick={openInternal}
          compact
        >
          <IconMenu2 size={15} />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Current</Menu.Label>
        <Menu.Item>{currentValue}</Menu.Item>
        <Menu.Label>Update</Menu.Label>
        <Menu.Item closeMenuOnClick={false}>
          <TextInput
            value={textFilter}
            onBlur={() => {
              setExternalFilter(textFilter);
              close();
            }}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                setExternalFilter(textFilter);
                close();
              }
            }}
            onSubmit={() => {
              setExternalFilter(textFilter);
              close();
            }}
            onChange={(e) => setTextFilter(e.currentTarget.value)}
          />
        </Menu.Item>
        <Menu.Item
          onClick={() => setExternalFilter(undefined)}
          closeMenuOnClick={true}
        >
          Clear
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
