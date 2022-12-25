import { useMantineColorScheme, ActionIcon, Group } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";
import { useLoggedInUser } from "src/utils/hooks/user/useLoggedInUser";

export const UserDarkMode = () => {
  const { user, updateUser } = useLoggedInUser();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const toggleUserColorScheme = () => {
    if (user) {
      const currentDarkMode = user.darkMode;
      updateUser({ darkMode: !currentDarkMode });
    }
  };
  if (user) {
    const userColorScheme = user.darkMode ? "dark" : "light";

    if (userColorScheme !== colorScheme) {
      toggleColorScheme();
    }
  }

  return (
    <Group position="center" my="xl">
      <ActionIcon
        onClick={() => toggleUserColorScheme()}
        size="lg"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          color:
            theme.colorScheme === "dark"
              ? theme.colors.yellow[4]
              : theme.colors.blue[6],
        })}
      >
        {colorScheme === "dark" ? (
          <IconSun size={18} />
        ) : (
          <IconMoonStars size={18} />
        )}
      </ActionIcon>
    </Group>
  );
};
