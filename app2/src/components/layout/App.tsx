import { Box, Container, Group, Stack, Tabs } from "@mantine/core";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { UserDarkMode } from "../user/UserDarkMode";
import { UserDisplay } from "../user/UserDisplay";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <Stack>
      <Group p="sm">
        <Tabs
          value={router.route}
          onTabChange={(e) => router.push("New Page", e as string)}
          variant="pills"
        >
          <Tabs.List>
            <Tabs.Tab value="/journals">Journals</Tabs.Tab>
            <Tabs.Tab value="/accountGroupings">Account Grouping</Tabs.Tab>
            <Tabs.Tab value="/accounts">Accounts</Tabs.Tab>
            <Tabs.Tab value="/budgets">Budgets</Tabs.Tab>
            <Tabs.Tab value="/bills">Bills</Tabs.Tab>
            <Tabs.Tab value="/tags">Tags</Tabs.Tab>
            <Tabs.Tab value="/categories">Categories</Tabs.Tab>
            <Tabs.Tab value="/user/settings">User</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <Container fluid />
        <UserDarkMode />
        <UserDisplay />
      </Group>
      <Box>{children}</Box>
    </Stack>
  );
};
