import { useRouter } from "next/router";
import { trpc } from "src/utils/trpc";
import { getCsrfToken } from "next-auth/react";
import { Container, Group, Stack, TextInput, Button } from "@mantine/core";
import { AuthLayout } from "src/components/auth/AuthLayout";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};

const SignIn = (context: { csrfToken: string }) => {
  const { query } = useRouter();
  const firstUserExists = trpc.user.firstUserExists.useQuery();
  // const callbackURL = trpc.user.getCallbackURL.useQuery();
  const router = useRouter();

  if (typeof window !== "undefined" && firstUserExists.data === false) {
    router.push("/user/createFirstUser");
  }

  const errorText =
    query.error === "CredentialsSignin"
      ? "Username / Password Error"
      : query.error;

  return (
    <AuthLayout title="Sign In" errors={errorText}>
      <form method="post" action="/api/auth/callback/credentials">
        <Stack sx={{ minWidth: 300 }}>
          <input
            name="csrfToken"
            type="hidden"
            defaultValue={context.csrfToken}
          />
          <TextInput width={40} label="Username" type="text" name="username" />
          <TextInput label="Password" type="password" name="password" />
          <Group>
            <Button
              color="blue"
              type="button"
              variant="subtle"
              onClick={() => router.push("/user/createUser")}
            >
              Sign Up
            </Button>
            <Container fluid />
            <Button color="blue" type="submit">
              Sign In
            </Button>
          </Group>
        </Stack>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
