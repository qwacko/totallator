import { Center, Group, Stack, Title } from "@mantine/core";

import { CreateAccountPopup } from "src/components/account/CreateAccount";
import { AccountTableAtom } from "src/components/account/accountTableAtom/AccountTableAtom";
import { AppLayout } from "src/components/layout/App";

const AccountsPage = () => {
  return (
    <AppLayout>
      <Stack>
        <Center>
          <Group>
            <Title>Accounts Atom</Title>
            <CreateAccountPopup />
          </Group>
        </Center>
        <AccountTableAtom />
      </Stack>
    </AppLayout>
  );
};

export default AccountsPage;
