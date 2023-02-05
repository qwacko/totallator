import { Center, Group, Stack, Title } from "@mantine/core";
import { cloneDeep } from "lodash";
import { useState } from "react";

import { JournalFilterModal } from "src/components/journals/JournalFiltersDropdown";
import { AppLayout } from "src/components/layout/App";
import { trpc } from "src/utils/trpc";
import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";

export const defaultJournalFilters: JournalFilterValidationInputType = {
  account: { type: { in: ["Asset", "Liability"] } }
};

const SummaryPage = () => {
  const [filters, setFilters] = useState<JournalFilterValidationInputType>(
    cloneDeep(defaultJournalFilters)
  );

  const data = trpc.summary.getTimeData.useQuery({
    groupingList: ["billId"],
    filters: [filters]
  });

  return (
    <AppLayout>
      <Stack>
        <Center>
          <Group>
            <Title>Summary</Title>
            <JournalFilterModal filters={filters} setFilters={setFilters} />
          </Group>
        </Center>
        {JSON.stringify(data.data)}
      </Stack>
    </AppLayout>
  );
};

export default SummaryPage;
