import { Center, Group, Stack, Title } from "@mantine/core";

import { AppLayout } from "src/components/layout/App";
import { CreateTagPopup } from "src/components/tag/CreateTag";
import { TagTable } from "src/components/tag/TagTable";

const TagsPage = () => {
  return (
    <AppLayout>
      <Stack>
        <Center>
          <Group>
            <Title>Tags</Title>
            <CreateTagPopup />
          </Group>
        </Center>
        <TagTable />
      </Stack>
    </AppLayout>
  );
};

export default TagsPage;
