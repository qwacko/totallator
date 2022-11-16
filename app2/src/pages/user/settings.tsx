import { Card, Stack } from "@mantine/core";
import { UserDarkMode } from "src/components/user/UserDarkMode";
import { UserSettingsForm } from "src/components/user/UserSettingsForm";

const UserSettings = () => {
  return (
    <Stack>
      <UserDarkMode />
      <Card>
        <UserSettingsForm />
      </Card>
    </Stack>
  );
};

export default UserSettings;
