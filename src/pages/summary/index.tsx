import { Center, Group, Stack, Title } from "@mantine/core";

import { AppLayout } from "src/components/layout/App";
import { SummaryDisplay } from "src/components/summary/SummaryDisplay";
import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";

export const defaultJournalFilters: JournalFilterValidationInputType = {
  account: { type: { in: ["Asset", "Liability"] } }
};

const SummaryPage = () => {
  return (
    <AppLayout>
      <Stack>
        <Center>
          <Group>
            <Title>Summary</Title>
          </Group>
        </Center>
        <SummaryDisplay initialFilter={defaultJournalFilters} />
      </Stack>
    </AppLayout>
  );
};

export default SummaryPage;
