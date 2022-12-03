import {
  Button,
  Checkbox,
  Group,
  Indicator,
  Menu,
  Modal,
  MultiSelect,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowsLeftRight,
  IconCheck,
  IconFilter,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons";
import { equal } from "assert";
import { filter, get, isEqual, merge, set } from "lodash";
import { useEffect, useState } from "react";
import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";
import {
  AccountMultiSelection,
  AccountSelection,
} from "../account/AccountSelection";
import { accountTypeFilter } from "../table/filters/accountTypeFilter";

type FiltersStateType = {
  filters: JournalFilterValidationInputType;
  setFilters: (data: JournalFilterValidationInputType) => void;
};

export const FilterMenuModal = ({
  filters: externalFilters,
  setFilters: setExternalFilters,
}: FiltersStateType) => {
  const { filters, setFilters, opened, close, open, updateFilter } = useFilters(
    { filters: externalFilters, setFilters: setExternalFilters }
  );

  return (
    <>
      <Modal
        transitionDuration={0}
        opened={opened}
        onClose={close}
        title="Journal Filters"
      >
        <Stack>
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
                checked={get(filters, `account.${item.key}.equals`) || false}
                indeterminate={
                  get(filters, `account.${item.key}.equals`) === undefined
                }
                onChange={(e) => {
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
          />
        </Stack>
      </Modal>

      <Button size="sm" compact variant="light" onClick={open}>
        <IconFilter size={15} />
      </Button>
    </>
  );
};

const useFilters = ({
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
    console.log("Updating Filter", key, value);
    console.log("New Filter", newFilter);

    setFilters(newFilter);
  };

  return { filters, setFilters, open, close, opened, updateFilter };
};
