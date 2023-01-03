import {
  Button,
  Checkbox,
  Container,
  Group,
  Modal,
  NumberInput,
  Stack,
} from "@mantine/core";
import { useSeedAccountGrouping } from "src/utils/hooks/accountGroupings/useSeedAccountGrouping";
import type { AccountGroupingReturnSingle } from "./AccountGroupingCard";

export const AccountGroupingSeed = ({
  data,
  opened,
  close,
}: {
  data: AccountGroupingReturnSingle;
  opened: boolean;
  close: () => void;
}) => {
  const { isLoading, canSeed, form, mutate, reset } = useSeedAccountGrouping({
    accountGroupingId: data.id,
  });

  if (isLoading || !canSeed) {
    return <></>;
  }

  return (
    <Modal opened={opened} onClose={close} title={`Seed ${data.title}`}>
      <form
        onSubmit={form.onSubmit((values) =>
          mutate(values, { onSuccess: close })
        )}
      >
        <Stack>
          <Checkbox
            {...form.getInputProps("includePersonal")}
            checked={form.values.includePersonal}
            label="Include Personal Items"
          />
          <Checkbox
            {...form.getInputProps("includeBusiness")}
            checked={form.values.includeBusiness}
            label="Include Business Items"
          />
          <Checkbox
            {...form.getInputProps("includeAccounts")}
            checked={form.values.includeAccounts}
            label="Seed Accounts"
          />
          <Checkbox
            {...form.getInputProps("seedAsSample")}
            checked={form.values.seedAsSample}
            label="Seed Includes Sample Value Types"
          />
          <NumberInput
            {...form.getInputProps("transactionCount")}
            label="Transaction Count"
            step={100}
          />
          <NumberInput
            {...form.getInputProps("numberYears")}
            label="Number Of Years For Generated Transactions"
          />

          <Group pt="md">
            <Button onClick={close}>Cancel</Button>
            <Button onClick={reset}>Reset</Button>
            <Container fluid />
            <Button type="submit">Seed</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
