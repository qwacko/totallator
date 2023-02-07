import { Center, Group, Stack, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { AppLayout } from "src/components/layout/App";
import { SummaryDisplay } from "src/components/summary/SummaryDisplay";
import { trpc } from "src/utils/trpc";

import { generateFiltersFromURLIds } from "../../../utils/generateFiltersFromURLIds";

const CategorySummaryPage = () => {
  const { query } = useRouter();
  const [filterAtom, id] = useMemo(
    () =>
      generateFiltersFromURLIds(query, (ids) => ({
        categoryId: { in: ids },
        account: { type: { in: ["Asset", "Liability"] } }
      })),
    [query]
  );

  const categoriesQuery = trpc.categories.get.useQuery({
    filters: [{ id: { in: [id || ""] } }]
  });

  return (
    <AppLayout>
      <Stack>
        <Center>
          <Group>
            <Title>
              {categoriesQuery?.data?.data && categoriesQuery?.data?.data[0]
                ? `${categoriesQuery?.data?.data[0].title} `
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

export default CategorySummaryPage;
