import { Center, Group, Stack, Title } from "@mantine/core";

import { AccountTableView } from "src/components/account/AccountTableView";
import { CreateAccountPopup } from "src/components/account/CreateAccount";
import { AppLayout } from "src/components/layout/App";

const AccountsViewPage = () => {
  return (
    <AppLayout>
      <Stack>
        <Center>
          <Group>
            <Title>Accounts View</Title>
            <CreateAccountPopup />
          </Group>
        </Center>
        <AccountTableView />
      </Stack>
    </AppLayout>
  );
};

export default AccountsViewPage;
