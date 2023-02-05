import { Center, Group, Stack, Title } from "@mantine/core";

import { CreateBudgetPopup } from "src/components/budget/CreateBudget";
import { BudgetTable } from "src/components/budget/table/BudgetTable";
import { AppLayout } from "src/components/layout/App";

const BudgetsPage = () => {
  return (
    <AppLayout>
      <Stack>
        <Center>
          <Group>
            <Title>Budgets</Title>
            <CreateBudgetPopup />
          </Group>
        </Center>
        <BudgetTable />
      </Stack>
    </AppLayout>
  );
};

export default BudgetsPage;
