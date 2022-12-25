import { Button, Group, Loader, Text } from "@mantine/core";
import { useLoggedInUser } from "src/utils/hooks/user/useLoggedInUser";

export const UserDisplay = () => {
  const { user, isLoading, signOut } = useLoggedInUser();

  console.log("User", user);
  console.log("isLOading", isLoading);

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
      <Button variant="outline" size="xs" onClick={() => signOut()}>
        Logout
      </Button>
    </Group>
  );
};
