import { Center, Group, Stack, Title } from "@mantine/core";
import { AccountTable } from "src/components/account/AccountTable";
import { CreateAccountPopup } from "src/components/account/CreateAccount";
import { AppLayout } from "src/components/layout/App";

const AccountsPage = () => {
  return (
    <AppLayout>
      <Stack>
        <Center>
          <Group>
            <Title>Accounts</Title>
            <CreateAccountPopup />
          </Group>
        </Center>
        <AccountTable />
      </Stack>
    </AppLayout>
  );
};

export default AccountsPage;
