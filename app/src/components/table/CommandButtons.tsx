import {
  Button,
  ButtonProps,
  Center,
  Group,
  MantineColor,
  Popover,
  Stack,
  Text,
  Tooltip,
  TooltipProps,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCopy, IconCross, IconTrash } from "@tabler/icons";
import React from "react";
import { string } from "zod";

type buttonConfig = { hidden?: boolean; disabled: boolean; action: () => void };
type buttonConfigWithHighlight = buttonConfig & { highlight: boolean };
type buttonConfigWithConfirmation = buttonConfig & { message: string };

export const CommandButtons = ({
  deleteButton,
  cloneButton,
}: {
  deleteButton?: buttonConfigWithConfirmation;
  cloneButton?: buttonConfig;
}) => {
  return (
    <Center>
      <Group>
        <Button.Group>
          {cloneButton && !cloneButton.hidden && (
            <Tooltip label="Clone">
              <Button
                onClick={cloneButton.action}
                size="xs"
                variant="outline"
                disabled={cloneButton.disabled}
              >
                <IconCopy size={15} />
              </Button>
            </Tooltip>
          )}
          {deleteButton && !deleteButton.hidden && (
            <ButtonWithCheck
              onClick={deleteButton.action}
              size="xs"
              variant="outline"
              disabled={deleteButton.disabled}
              color="red"
              message={deleteButton.message}
              tooltipConfig={{ label: "Delete", color: "red" }}
            >
              <IconTrash size={15} />
            </ButtonWithCheck>
          )}
        </Button.Group>
      </Group>
    </Center>
  );
};

const ButtonWithCheck = ({
  message,
  children,
  onClick,
  tooltipConfig,
  ...props
}: ButtonProps & {
  onClick?: () => void;
  message: string;
  children: React.ReactNode;
  tooltipConfig: Omit<TooltipProps, "children">;
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Popover
      width={200}
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
      onClose={close}
      onOpen={open}
    >
      <Popover.Target>
        <Tooltip {...tooltipConfig}>
          <Button {...props} onClick={open}>
            {children}
          </Button>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack>
          <Text>{message}</Text>
          <Button {...props} onClick={onClick}>
            {children}
          </Button>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};
