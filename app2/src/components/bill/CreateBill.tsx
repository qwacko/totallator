import { Button, Group, Modal, Select, Stack, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useDisclosure } from "@mantine/hooks";
import { useCreateBill } from "src/utils/hooks/bills/useCreateBill";
import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";

export const CreateBillForm = () => {
  const { data: accountGroupings } = useAccountGroupings();

  const createBill = useCreateBill({
    onMutate: close,
  });

  return (
    <form
      onSubmit={createBill.form.onSubmit((values) =>
        createBill.mutate.mutate(values)
      )}
    >
      <Stack>
        <Select
          label="Account Grouping"
          required
          clearable
          data={
            accountGroupings
              ? accountGroupings.map((ag) => ({
                  value: ag.id,
                  label: ag.title,
                }))
              : []
          }
          {...createBill.form.getInputProps("accountGroupingId")}
        />
        <TextInput
          {...createBill.form.getInputProps("title")}
          required
          label="Title"
        />

        <Group position="right">
          <Button type="submit">Create</Button>
        </Group>
      </Stack>
    </form>
  );
};

export const CreateBillPopup = () => {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open} size="sm" compact variant="light">
        <IconPlus size={15} />
      </Button>
      <Modal opened={opened} onClose={close} title="Create Bill">
        <CreateBillForm />
      </Modal>
    </>
  );
};
