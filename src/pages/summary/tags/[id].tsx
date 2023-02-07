import { Center, Group, Stack, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { AppLayout } from "src/components/layout/App";
import { SummaryDisplay } from "src/components/summary/SummaryDisplay";
import { trpc } from "src/utils/trpc";

import { generateFiltersFromURLIds } from "../../../utils/generateFiltersFromURLIds";

const TagSummaryPage = () => {
  const { query } = useRouter();
  const [filterAtom, id] = useMemo(
    () =>
      generateFiltersFromURLIds(query, (ids) => ({
        tagId: { in: ids },
        account: { type: { in: ["Asset", "Liability"] } }
      })),
    [query]
  );

  const tagsQuery = trpc.tags.get.useQuery({
    filters: [{ id: { in: [id || ""] } }]
  });

  return (
    <AppLayout>
      <Stack>
        <Center>
          <Group>
            <Title>
              {tagsQuery?.data?.data && tagsQuery?.data?.data[0]
                ? `${tagsQuery?.data?.data[0].title} `
                : " "}
              Summary
            </Title>
          </Group>
        </Center>
        <SummaryDisplay initialFilter={filterAtom} />
      </Stack>
    </AppLayout>
  );
};

export default TagSummaryPage;
