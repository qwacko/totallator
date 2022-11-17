import {
  Button,
  Center,
  Grid,
  Group,
  Loader,
  Modal,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useDisclosure } from "@mantine/hooks";
import { useCreateBill } from "src/utils/hooks/bills/useCreateBill";
import { useBills } from "src/utils/hooks/bills/useBills";
import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";

const BillsPage = () => {
  const { allBills, isLoading } = useBills();
  const { data: accountGroupings } = useAccountGroupings();

  const [opened, { close, open }] = useDisclosure(false);

  const createBill = useCreateBill({
    onMutate: close,
  });

  return (
    <Stack>
      <Center>
        <Group>
          <Title>Bills</Title>
          <Button onClick={open} size="sm" compact variant="light">
            <IconPlus size={15} />
          </Button>
          <Modal opened={opened} onClose={close} title="Create Bill">
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
          </Modal>
        </Group>
      </Center>
      {isLoading && (
        <Group>
          <Loader />
          <Text>Loading Bills</Text>
        </Group>
      )}
      <Grid p="md">
        {allBills &&
          allBills.map((bill) => {
            return (
              <Grid.Col key={bill.id} xl={3} lg={4} sm={6}>
                {bill.title}
              </Grid.Col>
            );
          })}
      </Grid>
    </Stack>
  );
};

export default BillsPage;
