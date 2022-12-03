import { Center, Group, Stack, Title } from "@mantine/core";
import { useState } from "react";
import { CreateTransactionSimplePopup } from "src/components/journals/CreateTransactionSimple";
import { JournalFilterModal } from "src/components/journals/JournalFiltersDropdown";
import { JournalTable } from "src/components/journals/JournalTable";
import { AppLayout } from "src/components/layout/App";
import { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";

const JournalsPage = () => {
  const [filters, setFilters] = useState<JournalFilterValidationInputType>({
    account: { type: { in: ["Asset", "Liability"] } },
  });

  return (
    <AppLayout>
      <Stack>
        <Center>
          <Group>
            <Title>Journals</Title>
            <CreateTransactionSimplePopup />
            <JournalFilterModal filters={filters} setFilters={setFilters} />
          </Group>
        </Center>
        <JournalTable filters={[filters]} />
      </Stack>
    </AppLayout>
  );
};

export default JournalsPage;
