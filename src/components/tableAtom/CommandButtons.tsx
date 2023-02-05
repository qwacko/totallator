import {
  Button,
  type ButtonProps,
  Center,
  type DefaultMantineColor,
  Group,
  Popover,
  Stack,
  Text,
  Tooltip,
  type TooltipProps
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCheck,
  IconCopy,
  IconEyeCheck,
  IconReport,
  IconTrash
} from "@tabler/icons";
import React, { type ReactNode } from "react";

type buttonConfig = { hidden?: boolean; disabled: boolean; action: () => void };
type buttonConfigWithHighlight = buttonConfig & { highlight?: boolean };
type buttonConfigWithConfirmation = buttonConfig & { message: string };

export const CommandButtons = ({
  deleteButton,
  cloneButton,
  completeButton,
  dataCheckedButton,
  reconciledButton
}: {
  deleteButton?: buttonConfigWithConfirmation;
  cloneButton?: buttonConfigWithHighlight;
  completeButton?: buttonConfigWithHighlight;
  reconciledButton?: buttonConfigWithHighlight;
  dataCheckedButton?: buttonConfigWithHighlight;
}) => {
  return (
    <Center>
      <Group>
        <Button.Group>
          <CommandButtonSingle
            buttonConfig={dataCheckedButton}
            tooltipConfig={{ label: "Data Checked" }}
          >
            <IconEyeCheck size={15} />
          </CommandButtonSingle>
          <CommandButtonSingle
            buttonConfig={reconciledButton}
            tooltipConfig={{ label: "Reconciled" }}
          >
            <IconReport size={15} />
          </CommandButtonSingle>
          <CommandButtonSingle
            buttonConfig={completeButton}
            tooltipConfig={{ label: "Complete" }}
            color="green"
          >
            <IconCheck size={10} />
          </CommandButtonSingle>
          <CommandButtonSingle
            buttonConfig={cloneButton}
            tooltipConfig={{ label: "Clone" }}
          >
            <IconCopy size={15} />
          </CommandButtonSingle>
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

const CommandButtonSingle = ({
  buttonConfig,
  children,
  tooltipConfig,
  color
}: {
  buttonConfig?: buttonConfigWithHighlight;
  children?: ReactNode;
  color?: DefaultMantineColor;
  tooltipConfig: Omit<TooltipProps, "children">;
}) => {
  return (
    <>
      {buttonConfig && !buttonConfig.hidden && (
        <Tooltip {...tooltipConfig}>
          <Button
            onClick={buttonConfig.action}
            size="xs"
            variant={buttonConfig.highlight ? "filled" : "outline"}
            disabled={buttonConfig.disabled}
            color={color}
            compact
          >
            {children || tooltipConfig.label}
          </Button>
        </Tooltip>
      )}
    </>
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
          <Button {...props} onClick={open} compact>
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
