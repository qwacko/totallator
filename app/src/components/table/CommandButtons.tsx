import { Button, Center, Group, Tooltip } from "@mantine/core";
import { IconCopy, IconTrash } from "@tabler/icons";

export const CommandButtons = ({
  onDelete,
  onClone,
  canDelete = true,
  canClone = true,
  admin = false,
}: {
  onDelete?: () => void;
  onClone?: () => void;
  canDelete: boolean;
  canClone: boolean;
  admin: boolean;
}) => {
  return (
    <Center>
      <Group>
        <Button.Group>
          <Tooltip label="Clone">
            <Button
              onClick={() => onClone && onClone()}
              size="xs"
              variant="outline"
              disabled={!admin || !canClone}
            >
              <IconCopy size={15} />
            </Button>
          </Tooltip>
          <Tooltip label="Delete" color="red">
            <Button
              onClick={() => onDelete && onDelete()}
              size="xs"
              variant="outline"
              disabled={!admin || !canDelete}
              color="red"
            >
              <IconTrash size={15} />
            </Button>
          </Tooltip>
        </Button.Group>
      </Group>
    </Center>
  );
};
