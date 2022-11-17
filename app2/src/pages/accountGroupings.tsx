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
  Title,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";
import { useDisclosure } from "@mantine/hooks";
import { useCreateAccountGrouping } from "src/utils/hooks/accountGroupings/useCreateAccountGrouping";

const AccountGroupingsPage = () => {
  const { data: accountGroupings, isLoading } = useAccountGroupings();

  const [opened, { close, open, toggle }] = useDisclosure(false);

  const createAccountGrouping = useCreateAccountGrouping({
    onMutate: close,
  });

  return (
    <Stack>
      <Center>
        <Group>
          <Title>Account Groupings</Title>
          <Button onClick={open} size="sm">
            <IconPlus />
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
      <Grid>
        {accountGroupings &&
          accountGroupings.map((ag) => {
            return (
              <Grid.Col key={ag.id} span={4}>
                {ag.title}
              </Grid.Col>
            );
          })}
      </Grid>
    </Stack>
  );
};

export default AccountGroupingsPage;
