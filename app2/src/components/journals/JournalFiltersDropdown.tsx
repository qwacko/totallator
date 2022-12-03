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
import { cloneDeep, get, set } from "lodash";
import { useState } from "react";
import { defaultJournalFilters } from "src/pages/journals";
import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";
import { AccountMultiSelection } from "../account/AccountSelection";
import { AccountGroupingMultiSelection } from "../accountGrouping/AccountGroupingSelection";
import { BillMultiSelection } from "../bill/BillSelection";
import { BudgetMultiSelection } from "../budget/BudgetSelection";
import { CategoryMultiSelection } from "../category/CategorySelection";
import { TagMultiSelection } from "../tag/TagSelection";

type FiltersStateType = {
  filters: JournalFilterValidationInputType;
  setFilters: (data: JournalFilterValidationInputType) => void;
};

export const JournalFilterModal = ({
  filters: externalFilters,
  setFilters: setExternalFilters,
}: FiltersStateType) => {
  const { filters, opened, close, open, updateFilter, resetFilter } =
    useJournalFilters({
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
          <AccountMultiSelection
            value={get(filters, "transaction.journalEntries.some.accountId.in")}
            onChange={(e) =>
              updateFilter(
                "transaction.journalEntries.some.accountId.in",
                e.length === 0 ? undefined : e
              )
            }
            searchable
            clearable
            size="xs"
            label="Payees"
          />
          <BillMultiSelection
            value={get(filters, "billId.in")}
            onChange={(e) =>
              updateFilter("billId.in", e.length === 0 ? undefined : e)
            }
            searchable
            clearable
            size="xs"
            label="Bills"
          />

          <BudgetMultiSelection
            value={get(filters, "budgetId.in")}
            onChange={(e) =>
              updateFilter("budgetId.in", e.length === 0 ? undefined : e)
            }
            searchable
            clearable
            size="xs"
            label="Budgets"
          />
          <CategoryMultiSelection
            value={get(filters, "categoryId.in")}
            onChange={(e) =>
              updateFilter("categoryId.in", e.length === 0 ? undefined : e)
            }
            searchable
            clearable
            size="xs"
            label="Categories"
          />
          <TagMultiSelection
            value={get(filters, "tagId.in")}
            onChange={(e) =>
              updateFilter("tagId.in", e.length === 0 ? undefined : e)
            }
            searchable
            clearable
            size="xs"
            label="Tags"
          />
          <Group>
            <Button variant="outline" onClick={resetFilter}>
              Reset
            </Button>
            <Button variant="outline" onClick={close}>
              Apply
            </Button>
          </Group>
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

  const resetFilter = () => {
    setFilters(cloneDeep(defaultJournalFilters));
  };

  return {
    filters,
    setFilters,
    open,
    close,
    opened,
    updateFilter,
    resetFilter,
  };
};
