import { Autocomplete, Loader, Select, Table, TextInput } from "@mantine/core";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Home: NextPage = () => {
  const [selected, setSelected] = useState(false);
  return (
    <>
      <Head>
        <title>Totallator</title>
        <meta name="description" content="Totallator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Content Goes Here</div>
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
