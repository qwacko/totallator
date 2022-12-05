import { useDisclosure } from "@mantine/hooks";
import { cloneDeep, set } from "lodash";
import { useState } from "react";
import { defaultJournalFilters } from "src/pages/journals";
import { trpc } from "src/utils/trpc";
import { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";
import { FiltersStateType } from "src/components/journals/JournalFiltersDropdown";

export const useJournalFilters = ({
  filters: externalFilters,
  setFilters: setExternalFilters,
}: FiltersStateType) => {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [filters, setFilters] =
    useState<JournalFilterValidationInputType>(externalFilters);

  const utils = trpc.useContext();

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
