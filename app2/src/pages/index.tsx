import { Table, TextInput } from "@mantine/core";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { UserDisplay } from "src/components/user/UserDisplay";
import { UserDarkMode } from "src/components/user/UserDarkMode";

const Home: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const [selected, setSelected] = useState(false);

  console.log("Index Page Session Status", status);

  if (typeof window !== undefined && status === "unauthenticated") {
    // router.push("/user/signin");
    console.log("User Isn't Authenticated");
  }

  return (
    <>
      <Head>
        <title>Totallator</title>
        <meta name="description" content="Totallator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Content Goes Here</div>
      <UserDisplay />
      <UserDarkMode />
      <Table horizontalSpacing="xs" verticalSpacing="xs">
        <thead>
          <tr>
            <th>Col 3</th>
            <th>Col 2</th>
            <th>Col 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <TextInput
                defaultValue="Text"
                size="xs"
                withAsterisk
                variant="default"
                styles={{
                  input: {
                    padding: 5,
                    border: "true",
                    borderWidth: 1,
                    borderColor: selected ? "blue" : "transparent",
                    borderRadius: 2,
                  },
                }}
                onSelect={() => setSelected(true)}
                onBlur={() => setSelected(false)}
              />
            </td>
            <td>
              <TextInput
                defaultValue="Text"
                size="xs"
                variant={selected ? "default" : "unstyled"}
                sx={{ padding: 0 }}
                withAsterisk
                styles={{ input: { padding: 5 } }}
              />
            </td>
            <td>
              <TextInput
                defaultValue="Text"
                size="xs"
                variant={selected ? "default" : "unstyled"}
                sx={{ padding: 0 }}
                withAsterisk
                styles={{ input: { padding: 5 } }}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Home;
