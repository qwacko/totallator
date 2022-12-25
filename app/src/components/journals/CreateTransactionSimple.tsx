import {
  Button,
  Group,
  type MantineSize,
  Modal,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useDisclosure } from "@mantine/hooks";
import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";
import { useCreateTransactionSimple } from "src/utils/hooks/journals/useCreateTransactionSimple";
import { DatePicker } from "@mantine/dates";
import { useLoggedInUser } from "src/utils/hooks/user/useLoggedInUser";
import { AccountSelection } from "../account/AccountSelection";
import { TagSelection } from "../tag/TagSelection";
import { CategorySelection } from "../category/CategorySelection";
import { BudgetSelection } from "../budget/BudgetSelection";
import { BillSelection } from "../bill/BillSelection";

const size: MantineSize = "xs";

export const CreateTransactionSimpleForm = ({
  onClose,
}: {
  onClose?: () => void;
}) => {
  const { data: accountGroupings } = useAccountGroupings();
  const { dayjsFormat } = useLoggedInUser();

  const createTrans = useCreateTransactionSimple({
    onMutate: () => {
      onClose && onClose();
    },
  });

  return (
    <form
      onSubmit={createTrans.form.onSubmit((values) =>
        createTrans.mutate.mutate(values)
      )}
    >
      <Stack spacing={size}>
        <Select
          label="Account Grouping"
          required
          clearable
          data={
            accountGroupings
              ? accountGroupings.map((ag) => ({
                  value: ag.id,
                  label: ag.title,
                }))
              : []
          }
          {...createTrans.form.getInputProps("accountGroupingId")}
          size={size}
        />
        {!!createTrans.form.values.accountGroupingId && (
          <>
            <DatePicker
              {...createTrans.form.getInputProps("date")}
              required
              label="Transaction Date"
              inputFormat={dayjsFormat}
              allowFreeInput
              size={size}
            />
            <TextInput
              {...createTrans.form.getInputProps("description")}
              required
              label="Description"
              size={size}
            />
            <NumberInput
              {...createTrans.form.getInputProps("amount")}
              required
              label="Amount"
              size={size}
            />
            <AccountSelection
              {...createTrans.form.getInputProps("fromAccountId")}
              label="From Account"
              searchable
              accountGroupingId={createTrans.form.values.accountGroupingId}
              size={size}
            />
            <AccountSelection
              {...createTrans.form.getInputProps("toAccountId")}
              label="To Account"
              searchable
              accountGroupingId={createTrans.form.values.accountGroupingId}
              size={size}
            />
            <TagSelection
              {...createTrans.form.getInputProps("tagId")}
              label="Tag"
              searchable
              accountGroupingId={createTrans.form.values.accountGroupingId}
              size={size}
            />

            <CategorySelection
              {...createTrans.form.getInputProps("categoryId")}
              label="Category"
              searchable
              accountGroupingId={createTrans.form.values.accountGroupingId}
              size={size}
            />
            <BudgetSelection
              {...createTrans.form.getInputProps("budgetId")}
              label="Budget"
              searchable
              accountGroupingId={createTrans.form.values.accountGroupingId}
              size={size}
            />
            <BillSelection
              {...createTrans.form.getInputProps("billId")}
              label="Bill"
              searchable
              accountGroupingId={createTrans.form.values.accountGroupingId}
              size={size}
            />
          </>
        )}

        <Group position="right">
          <Button type="submit">Create</Button>
        </Group>
      </Stack>
    </form>
  );
};

export const CreateTransactionSimplePopup = () => {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open} size="sm" compact variant="light">
        <IconPlus size={15} />
      </Button>
      <Modal opened={opened} onClose={close} title="Create Transaction">
        <CreateTransactionSimpleForm onClose={close} />
      </Modal>
    </>
  );
};
