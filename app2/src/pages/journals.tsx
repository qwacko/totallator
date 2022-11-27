import { Center, Group, Stack, Title } from "@mantine/core";
import { CategoryTable } from "src/components/category/CategoryTable";
import { CreateTransactionSimplePopup } from "src/components/journals/CreateTransactionSimple";
import { AppLayout } from "src/components/layout/App";

const JournalsPage = () => {
  return (
    <AppLayout>
      <Stack>
        <Center>
          <Group>
            <Title>Journals</Title>
            <CreateTransactionSimplePopup />
          </Group>
        </Center>
        <CategoryTable />
      </Stack>
    </AppLayout>
  );
};

export default JournalsPage;
