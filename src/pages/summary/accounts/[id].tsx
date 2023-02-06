import { Center, Group, Stack, Title } from "@mantine/core";
import { useRouter } from "next/router";
import type { ParsedUrlQuery } from "querystring";
import { useMemo } from "react";
import { z } from "zod";

import { AppLayout } from "src/components/layout/App";
import { SummaryDisplay } from "src/components/summary/SummaryDisplay";
import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";

export const defaultJournalFilters: JournalFilterValidationInputType = {
  account: { type: { in: ["Asset", "Liability"] } }
};

const generateFilters = (queryData: ParsedUrlQuery) => {
  const validatedQuery = z
    .object({
      id: z.preprocess(
        (data) => String(data).split(","),
        z.array(z.string().cuid())
      )
    })
    .safeParse(queryData);
  const defaultFilter = validatedQuery.success
    ? { accountId: { in: validatedQuery.data.id } }
    : defaultJournalFilters;
  return defaultFilter;
};

const AccountSummaryPage = () => {
  const { query } = useRouter();
  const filterAtom = useMemo(() => generateFilters(query), [query]);

  return (
    <AppLayout>
      <Stack>
        <Center>
          <Group>
            <Title>Summary</Title>
          </Group>
        </Center>
        <SummaryDisplay initialFilter={filterAtom} />
      </Stack>
    </AppLayout>
  );
};

export default AccountSummaryPage;
