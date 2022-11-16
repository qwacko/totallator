import { Button, Group, Loader, Text } from "@mantine/core";
import { useLoggedInUser } from "src/utils/hooks/user/useLoggedInUser";

export const UserDisplay = () => {
  const { user, isLoading, signOut } = useLoggedInUser();

  if (isLoading || !user) {
    return (
      <Group>
        <Loader />
        <Text>Loading User</Text>
      </Group>
    );
  }

  return (
    <Group>
      <Text>{user.name}</Text>
      <Button onClick={() => signOut()}>Logout</Button>
    </Group>
  );
};
