import {
  Button,
  Center,
  Grid,
  Group,
  Loader,
  Modal,
  Stack,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons";

import { AccountGroupingCard } from "src/components/accountGrouping/AccountGroupingCard";
import { AppLayout } from "src/components/layout/App";
import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";
import { useCreateAccountGrouping } from "src/utils/hooks/accountGroupings/useCreateAccountGrouping";

const AccountGroupingsPage = () => {
  const { data: accountGroupings, isLoading } = useAccountGroupings();

  const [opened, { close, open }] = useDisclosure(false);

  const createAccountGrouping = useCreateAccountGrouping({
    onMutate: close
  });

  return (
    <AppLayout>
      <Stack>
        <Center>
          <Group>
            <Title>Account Groupings</Title>
            <Button onClick={open} size="sm" compact variant="light">
              <IconPlus size={15} />
            </Button>
            <Modal
              opened={opened}
              onClose={close}
              title="Create Account Grouping"
            >
              <form
                onSubmit={createAccountGrouping.form.onSubmit((values) =>
                  createAccountGrouping.mutate.mutate(values)
                )}
              >
                <Stack>
                  <TextInput
                    {...createAccountGrouping.form.getInputProps("title")}
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
            <Text>Loading Account Groupings</Text>
          </Group>
        )}
        <Grid p="md">
          {accountGroupings &&
            accountGroupings.map((ag) => {
              return (
                <Grid.Col key={ag.id} xl={3} lg={4} sm={6}>
                  <AccountGroupingCard data={ag} />
                </Grid.Col>
              );
            })}
        </Grid>
      </Stack>
    </AppLayout>
  );
};

export default AccountGroupingsPage;
