import { useDisclosure } from "@mantine/hooks";
import { cloneDeep, set } from "lodash";
import { useState } from "react";

import type { FiltersStateType } from "src/components/journals/JournalFiltersDropdown";
import { defaultJournalFilters } from "src/pages/journals";
import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";

export const useJournalFilters = ({
  filters: externalFilters,
  setFilters: setExternalFilters,
  resetFilters
}: FiltersStateType & {
  resetFilters?: () => JournalFilterValidationInputType;
}) => {
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

  const updateFilter = (
    key: string,
    value: unknown,
    updateExternal = false
  ) => {
    const newFilter = { ...filters };
    set(newFilter, key, value);
    console.log("New Filter", newFilter);

    setFilters(newFilter);
    if (updateExternal) {
      setExternalFilters(newFilter);
    }
  };

  const resetFilter = () => {
    if (resetFilters) {
      console.log("Resetting Filters");
      const newDefault = resetFilters();
      console.log("New Default", newDefault);
      setFilters(newDefault);
    } else {
      setFilters(cloneDeep(defaultJournalFilters));
    }
  };

  return {
    filters,
    setFilters,
    open,
    close,
    opened,
    updateFilter,
    resetFilter
  };
};
