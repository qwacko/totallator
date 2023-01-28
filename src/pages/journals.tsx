import { Center, Group, Stack, Title } from "@mantine/core";
import { cloneDeep } from "lodash";
import { useState } from "react";

import { CreateTransactionSimplePopup } from "src/components/journals/CreateTransactionSimple";
import { JournalFilterModal } from "src/components/journals/JournalFiltersDropdown";
import { JournalTableSimple } from "src/components/journals/journalTableSimple/journalTableSimple";
import { AppLayout } from "src/components/layout/App";
import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";

export const defaultJournalFilters: JournalFilterValidationInputType = {
  account: { type: { in: ["Asset", "Liability"] } }
};

const JournalsPage = () => {
  const [filters, setFilters] = useState<JournalFilterValidationInputType>(
    cloneDeep(defaultJournalFilters)
  );

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
        <JournalTableSimple filters={[filters]} />
      </Stack>
    </AppLayout>
  );
};

export default JournalsPage;
