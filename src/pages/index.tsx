import { Center, Group, Stack, Title } from "@mantine/core";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { AppLayout } from "src/components/layout/App";

const Home: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  if (typeof window !== undefined && status === "unauthenticated") {
    router.push("/user/signin");
    console.log("User Isn't Authenticated");
  }

  return (
    <>
      <AppLayout>
        <Stack>
          <Center>
            <Group>
              <Title>Home</Title>
            </Group>
          </Center>
        </Stack>
      </AppLayout>
    </>
  );
};

export default Home;
