import {
  Button,
  Group,
  Modal,
  NumberInput,
  Stack,
  Text,
  TextInput
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";

import { useUpdateJournals } from "src/utils/hooks/journals/useUpdateJournal";
import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";
import {
  type UpdateJournalDataInputType,
  updateJournalInputData
} from "src/utils/validation/journalEntries/updateJournalValidation";

import { AccountSelection } from "../../../account/AccountSelection";
import { BillSelection } from "../../../bill/BillSelection";
import { BudgetSelection } from "../../../budget/BudgetSelection";
import { CategorySelection } from "../../../category/CategorySelection";
import { TagSelection } from "../../../tag/TagSelection";

export const UpdateBulkJournalsModal = ({
  opened,
  close,
  filters,
  maxUpdated,
  multipleAccountGroupings,
  accountGroupingId
}: {
  opened: boolean;
  close: () => void;
  filters: JournalFilterValidationInputType[];
  maxUpdated: number;
  multipleAccountGroupings: boolean;
  accountGroupingId: string | undefined;
}) => {
  const { mutate } = useUpdateJournals({ onSuccess: close });

  const form = useForm<UpdateJournalDataInputType>({
    validate: zodResolver(updateJournalInputData)
  });

  const resetForm = () => {
    form.reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={`Update ${maxUpdated} Transactions?`}
    >
      <form
        onSubmit={form.onSubmit((value) =>
          mutate({
            filters,
            data: value,
            maxUpdated
          })
        )}
      >
        <Stack>
          <TextInput
            {...form.getInputProps("description")}
            value={form.values.description}
            label="Description"
          />
          <DatePicker
            {...form.getInputProps("date")}
            value={form.values.date || null}
            label="Date"
          />
          <NumberInput
            {...form.getInputProps("amount")}
            value={form.values.amount || undefined}
            label="Amount"
            precision={2}
          />
          {multipleAccountGroupings && <Text>Multiple Account Groupings</Text>}
          {!multipleAccountGroupings && (
            <>
              <AccountSelection
                {...form.getInputProps("accountId")}
                value={form.values.accountId || null}
                label="Account"
                accountGroupingId={accountGroupingId}
                searchable
                createExpenseOption
                onCreateSuccess={(newId) =>
                  form.setFieldValue("accountId", newId)
                }
              />
              <CategorySelection
                {...form.getInputProps("categoryId")}
                value={form.values.categoryId || null}
                label="Category"
                accountGroupingId={accountGroupingId}
                searchable
              />
              <TagSelection
                {...form.getInputProps("tagId")}
                value={form.values.tagId || null}
                label="Tag"
                accountGroupingId={accountGroupingId}
                searchable
              />
              <BillSelection
                {...form.getInputProps("billId")}
                value={form.values.billId || null}
                label="Bill"
                accountGroupingId={accountGroupingId}
                searchable
              />
              <BudgetSelection
                {...form.getInputProps("budgetId")}
                value={form.values.budgetId || null}
                label="Budget"
                accountGroupingId={accountGroupingId}
                searchable
              />
            </>
          )}
          <Group position="apart">
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Clear
            </Button>
            <Button type="submit">Update</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
