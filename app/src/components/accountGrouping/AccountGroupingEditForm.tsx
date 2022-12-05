import {
  Button,
  Container,
  Group,
  Modal,
  SegmentedControl,
  Stack,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSettings } from "@tabler/icons";
import { useUpdateAccountGrouping } from "src/utils/hooks/accountGroupings/useUpdateAccountGrouping";
import type { AccountGroupingReturnSingle } from "./AccountGroupingCard";

export const AccountGroupingEditForm = ({
  data,
  onSubmit,
}: {
  data: AccountGroupingReturnSingle;
  onSubmit?: () => void;
}) => {
  const { form, mutate } = useUpdateAccountGrouping({
    onMutate: onSubmit,
    initialValues: { status: data.status, title: data.title },
  });

  console.log("AG Edit Form Value", form.values);

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        mutate.mutate({ id: data.id, data: values })
      )}
    >
      <Stack>
        <TextInput label="title" {...form.getInputProps("title")} />
        <SegmentedControl
          {...form.getInputProps("status")}
          data={[
            { value: "Active", label: "Active" },
            { value: "Disabled", label: "Disabled" },
            { value: "Deleted", label: "Deleted" },
          ]}
          color="blue"
        />
        <Group>
          <Container fluid />
          <Button type="submit">Update</Button>
        </Group>
      </Stack>
    </form>
  );
};

export const AccountGroupingEditPopup = ({
  data,
}: {
  data: AccountGroupingReturnSingle;
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal title="Update Account Grouping" opened={opened} onClose={close}>
        <AccountGroupingEditForm data={data} onSubmit={close} />
      </Modal>
      <Button variant="light" compact onClick={open}>
        <IconSettings size={15} />
      </Button>
    </>
  );
};
