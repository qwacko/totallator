import {
  Button,
  Checkbox,
  Group,
  Modal,
  MultiSelect,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFilter } from "@tabler/icons";
import { get, set } from "lodash";
import { useState } from "react";
import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";
import { AccountMultiSelection } from "../account/AccountSelection";
import { AccountGroupingMultiSelection } from "../accountGrouping/AccountGroupingSelection";

type FiltersStateType = {
  filters: JournalFilterValidationInputType;
  setFilters: (data: JournalFilterValidationInputType) => void;
};

export const JournalFilterModal = ({
  filters: externalFilters,
  setFilters: setExternalFilters,
}: FiltersStateType) => {
  const { filters, opened, close, open, updateFilter } = useJournalFilters({
    filters: externalFilters,
    setFilters: setExternalFilters,
  });

  return (
    <>
      <Modal
        transitionDuration={0}
        opened={opened}
        onClose={close}
        title="Journal Filters"
      >
        <Stack>
          <AccountGroupingMultiSelection
            value={get(filters, "accountGroupingId.in")}
            onChange={(e) =>
              updateFilter(
                "accountGroupingId.in",
                e.length === 0 ? undefined : e
              )
            }
            searchable
            clearable
            size="xs"
            label="Account Grouping"
          />
          <MultiSelect
            size="xs"
            clearable
            label="Account Type"
            data={["Asset", "Liability", "Income", "Expense"]}
            value={filters.account?.type?.in}
            onChange={(e) => {
              updateFilter("account.type.in", e.length === 0 ? undefined : e);
            }}
          />
          <Group>
            {[
              { key: "isCash", title: "Cash" },
              { key: "isNetWorth", title: "Net Worth" },
            ].map((item) => (
              <Checkbox
                key={item.key}
                checked={get(filters, `account.${item.key}.equals`) || false}
                indeterminate={
                  get(filters, `account.${item.key}.equals`) === undefined
                }
                onChange={() => {
                  const currentValue = get(
                    filters,
                    `account.${item.key}.equals`
                  );
                  if (currentValue === undefined) {
                    updateFilter(`account.${item.key}.equals`, true);
                  } else if (currentValue === true) {
                    updateFilter(`account.${item.key}.equals`, false);
                  } else {
                    updateFilter(`account.${item.key}.equals`, undefined);
                  }
                }}
                label={item.title}
              />
            ))}
          </Group>
          <AccountMultiSelection
            value={get(filters, "account.id.in")}
            onChange={(e) =>
              updateFilter("account.id.in", e.length === 0 ? undefined : e)
            }
            searchable
            clearable
            size="xs"
            label="Accounts"
          />
        </Stack>
      </Modal>

      <Button size="sm" compact variant="light" onClick={open}>
        <IconFilter size={15} />
      </Button>
    </>
  );
};

const useJournalFilters = ({
  filters: externalFilters,
  setFilters: setExternalFilters,
}: FiltersStateType) => {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [filters, setFilters] =
    useState<JournalFilterValidationInputType>(externalFilters);

  const open = () => {
    setFilters(externalFilters);
    openModal();
  };

  const close = () => {
    setExternalFilters(filters);
    closeModal();
  };

  const updateFilter = (key: string, value: unknown) => {
    const newFilter = { ...filters };
    set(newFilter, key, value);

    setFilters(newFilter);
  };

  return { filters, setFilters, open, close, opened, updateFilter };
};
