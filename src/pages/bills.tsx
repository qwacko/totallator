import { Center, Group, Stack, Title } from "@mantine/core";

import { BillTable } from "src/components/bill/BillTable";
import { CreateBillPopup } from "src/components/bill/CreateBill";
import { AppLayout } from "src/components/layout/App";

const BillsPage = () => {
  return (
    <AppLayout>
      <Stack>
        <Center>
          <Group>
            <Title>Bills</Title>
            <CreateBillPopup />
          </Group>
        </Center>
        <BillTable />
      </Stack>
    </AppLayout>
  );
};

export default BillsPage;
