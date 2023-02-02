import { Center, Group, Stack, Title } from "@mantine/core";

import { CreateAccountPopup } from "src/components/account/CreateAccount";
import { AccountTable } from "src/components/account/table/AccountTable";
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
