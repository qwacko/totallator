import { getServerSidePropsNotLoggedIn } from "src/server/common/get-server-auth-session";
import { Stack, TextInput, Group, Container, Button } from "@mantine/core";
import { useCreateUser } from "src/utils/hooks/user/useCreateUser";
import { AuthLayout } from "src/components/auth/AuthLayout";
import { useRouter } from "next/router";

export const getServerSideProps = getServerSidePropsNotLoggedIn;

const CreateUser = () => {
  const { form, createUser } = useCreateUser();
  const router = useRouter();

  return (
    <AuthLayout title="Sign Up">
      <form onSubmit={form.onSubmit((e) => createUser.mutate(e))}>
        <Stack sx={{ minWidth: 300 }}>
          <TextInput
            label="Username"
            placeholder="Username"
            {...form.getInputProps("username")}
          />
          <TextInput
            placeholder="Name"
            label="Name"
            {...form.getInputProps("name")}
          />
          <TextInput
            placeholder="Password"
            label="Password"
            type="password"
            {...form.getInputProps("password")}
          />
          <TextInput
            placeholder="Password"
            label="Repeat Password"
            type="password"
            {...form.getInputProps("checkPassword")}
          />
          <Group>
            <Button
              color="blue"
              type="button"
              variant="subtle"
              onClick={() => router.push("/user/signin")}
            >
              Sign In
            </Button>
            <Container fluid />
            <Button color="blue" type="submit">
              Create User
            </Button>
          </Group>
        </Stack>
      </form>
    </AuthLayout>
  );
};

export default CreateUser;
