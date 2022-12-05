import { getServerSidePropsNotLoggedIn } from "src/server/common/get-server-auth-session";
import { Button, Container, Group, Stack, TextInput } from "@mantine/core";
import { useCreateFirstUser } from "src/utils/hooks/user/useCreateFirstUser";
import { AuthLayout } from "src/components/auth/AuthLayout";

export const getServerSideProps = getServerSidePropsNotLoggedIn;

const CreateFirstUser = () => {
  const { firstUserExists, router, form, createUser } = useCreateFirstUser();

  if (typeof window !== undefined && firstUserExists.data === true) {
    router.push("/user/signin");
  }

  return (
    <AuthLayout title="Create First User">
      <form onSubmit={form.onSubmit((values) => createUser.mutate(values))}>
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
            placeholder="Repeat Password"
            label="Password"
            type="password"
            {...form.getInputProps("checkPassword")}
          />
          <Group>
            <Container fluid />
            <Button color="blue" type="submit">
              Create First User
            </Button>
          </Group>
        </Stack>
      </form>
    </AuthLayout>
  );
};

export default CreateFirstUser;
