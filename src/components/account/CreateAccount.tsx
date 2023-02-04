import {
  Button,
  Checkbox,
  Group,
  Input,
  Modal,
  SegmentedControl,
  Select,
  Stack,
  TextInput
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons";

import { useCreateAccount } from "src/utils/hooks/accounts/useCreateAccount";

import { AccountGroupingSelection } from "../accountGrouping/AccountGroupingSelection";

const CreateAccountForm = ({ onClose }: { onClose?: () => void }) => {
  const createAccount = useCreateAccount({
    onMutate: () => {
      onClose && onClose();
    }
  });

  return (
    <form
      onSubmit={createAccount.form.onSubmit((values) =>
        createAccount.mutate.mutate(values)
      )}
    >
      <Stack>
        <AccountGroupingSelection
          label="Account Grouping"
          required
          clearable
          {...createAccount.form.getInputProps("accountGroupingId")}
        />
        <Stack spacing={0}>
          <Input.Wrapper label="Account Type" required>
            <></>
          </Input.Wrapper>
          <SegmentedControl
            {...createAccount.form.getInputProps("type")}
            data={["Asset", "Liability", "Income", "Expense"]}
          />
        </Stack>
        <TextInput
          {...createAccount.form.getInputProps("title")}
          required
          label="Title"
        />
        {createAccount.form.values["type"] &&
          ["Asset", "Liability"].includes(
            createAccount.form.values["type"]
          ) && (
            <>
              <TextInput
                {...createAccount.form.getInputProps("accountGroup")}
                label="Account Group"
              />
              <TextInput
                {...createAccount.form.getInputProps("accountGroup2")}
                label="Account Group 2"
              />
              <TextInput
                {...createAccount.form.getInputProps("accountGroup3")}
                label="Account Group 3"
              />
              <Checkbox
                {...createAccount.form.getInputProps("isCash")}
                label="Is Cash"
              />
              <Checkbox
                {...createAccount.form.getInputProps("isNetWorth")}
                label="Is Net Worth"
              />
            </>
          )}
        <Group position="right">
          <Button type="submit">Create</Button>
        </Group>
      </Stack>
    </form>
  );
};

export const CreateAccountPopup = () => {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open} size="sm" compact variant="light">
        <IconPlus size={15} />
      </Button>
      <Modal opened={opened} onClose={close} title="Create Account">
        <CreateAccountForm onClose={close} />
      </Modal>
    </>
  );
};
