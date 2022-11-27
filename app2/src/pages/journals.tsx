import { Center, Group, Stack, Title } from "@mantine/core";
import { CreateTransactionSimplePopup } from "src/components/journals/CreateTransactionSimple";
import { JournalTable } from "src/components/journals/JournalTable";
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
        <JournalTable />
      </Stack>
    </AppLayout>
  );
};

export default JournalsPage;
