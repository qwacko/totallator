import { Card, Stack } from "@mantine/core";
import { AppLayout } from "src/components/layout/App";
import { UserSettingsForm } from "src/components/user/UserSettingsForm";

const UserSettings = () => {
  return (
    <AppLayout>
      <Stack p="lg">
        <Card p="lg">
          <UserSettingsForm />
        </Card>
      </Stack>
    </AppLayout>
  );
};

export default UserSettings;
