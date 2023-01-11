import { Center, Group, Stack, Title } from "@mantine/core";

import { CategoryTable } from "src/components/category/CategoryTable";
import { CreateCategoryPopup } from "src/components/category/CreateCategory";
import { AppLayout } from "src/components/layout/App";

const CategoriesPage = () => {
  return (
    <AppLayout>
      <Stack>
        <Center>
          <Group>
            <Title>Categories</Title>
            <CreateCategoryPopup />
          </Group>
        </Center>
        <CategoryTable />
      </Stack>
    </AppLayout>
  );
};

export default CategoriesPage;
