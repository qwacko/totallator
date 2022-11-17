import { Grid, Group, Loader, Stack, Text, Title } from "@mantine/core";
import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";

const AccountGroupingsPage = () => {
  const { data: accountGroupings, isLoading } = useAccountGroupings();
  return (
    <Stack>
      <Title>Account Groupings</Title>
      {isLoading && (
        <Group>
          <Loader />
          <Text>Loading Account Groupings</Text>
        </Group>
      )}
      <Grid>
        {accountGroupings &&
          accountGroupings.map((ag) => {
            return <Grid.Col span={4}>{ag.title}</Grid.Col>;
          })}
      </Grid>
    </Stack>
  );
};

export default AccountGroupingsPage;
