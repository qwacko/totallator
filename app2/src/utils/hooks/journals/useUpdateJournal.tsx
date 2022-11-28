import { useForm, zodResolver } from "@mantine/form";
import { trpc } from "src/utils/trpc";
import {
  type UpdateJournalDataInputType,
  updateJournalInputData,
} from "src/utils/validation/journalEntries/updateJournalValidation";
import { notifyTemplate } from "../notifyTemplate";
import { useFormHandler } from "../useFormHandler";
import type { JournalsMergedType } from "./useJournals";

const id = "useUpdateJournal";
const notifications = notifyTemplate(id, "Journal", "Update");

type keysType = keyof UpdateJournalDataInputType;

export const useUpdateJournals = ({
  onSuccess,
  onError,
  onMutate,
}: {
  onSuccess?: () => void;
  onError?: () => void;
  onMutate?: () => void;
} = {}) => {
  const utils = trpc.useContext();
  const { mutate, isLoading: isMutating } =
    trpc.journals.updateJournals.useMutation({
      onError: (e) => {
        notifications.onError(e);
        onError && onError();
        utils.journals.invalidate();
      },

      onSuccess: () => {
        notifications.onSuccess();
        onSuccess && onSuccess();
        utils.journals.invalidate();
      },
      onMutate: () => {
        notifications.onLoading();
        onMutate && onMutate();
      },
    });

  return {
    isMutating,
    mutate,
  };
};

export const useUpdateJournal = ({
  keys,
  data,
  updateCompleted = false,
}: {
  keys: keysType[];
  data: JournalsMergedType;
  updateCompleted?: boolean;
}) => {
  const form = useForm<UpdateJournalDataInputType>({
    validate: zodResolver(updateJournalInputData),
  });

  const { mutate, isMutating } = useUpdateJournals();

  const { resetForm, runMutate } = useFormHandler({
    data,
    form,
    keys,
    id,
    mutate,
    formDataToMutateData: (id, processedData) => ({
      data: processedData,
      filters: [{ id: { in: [data.id] } }],
      maxUpdated: 1,
      updateCompleteJournals: updateCompleted,
    }),
  });

  return {
    journal: data,
    isMutating,
    mutate,
    form,
    runMutate,
    resetForm,
  };
};
