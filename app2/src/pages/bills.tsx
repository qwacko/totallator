import { Center, Group, Stack, Title } from "@mantine/core";
import { CreateBillPopup } from "src/components/bill/CreateBill";
import { BillTable } from "src/components/bill/BillTable";

const BillsPage = () => {
  return (
    <Stack>
      <Center>
        <Group>
          <Title>Bills</Title>
          <CreateBillPopup />
        </Group>
      </Center>
      <BillTable />
    </Stack>
  );
};

export default BillsPage;
