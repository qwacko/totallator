import { Button, Menu } from "@mantine/core";
import { IconCheck, IconMenu } from "@tabler/icons";

export const StatusFilterMenu = <
  T extends {
    includeDeleted?: boolean;
    includeDisabled?: boolean;
    excludeActive?: boolean;
  }
>({
  filter,
  setFilter,
}: {
  setFilter: (data: T) => void;
  filter: T;
}) => {
  const inActive =
    filter.excludeActive === false &&
    filter.includeDeleted === false &&
    filter.includeDisabled === false;
  return (
    <Menu>
      <Menu.Target>
        <Button compact variant={inActive ? "white" : "light"}>
          <IconMenu size={15} />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Configs</Menu.Label>
        <Menu.Item
          onClick={() =>
            setFilter({
              ...filter,
              includeDeleted: false,
              includeDisabled: false,
              excludeActive: false,
            })
          }
        >
          Reset
        </Menu.Item>
        <Menu.Item
          onClick={() =>
            setFilter({
              ...filter,
              includeDeleted: true,
              includeDisabled: true,
              excludeActive: false,
            })
          }
        >
          All
        </Menu.Item>
        <Menu.Label>Included Items</Menu.Label>
        <Menu.Item
          icon={filter.includeDeleted ? <IconCheck size={15} /> : undefined}
          onClick={() =>
            setFilter({
              ...filter,
              includeDeleted: !filter.includeDeleted,
            })
          }
        >
          Include Deleted
        </Menu.Item>
        <Menu.Item
          icon={filter.includeDisabled ? <IconCheck size={15} /> : undefined}
          onClick={() =>
            setFilter({
              ...filter,
              includeDisabled: !filter.includeDisabled,
            })
          }
        >
          Include Disabled
        </Menu.Item>
        <Menu.Item
          icon={filter.excludeActive ? <IconCheck size={15} /> : undefined}
          onClick={() =>
            setFilter({
              ...filter,
              excludeActive: !filter.excludeActive,
            })
          }
        >
          Exclude Active
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
