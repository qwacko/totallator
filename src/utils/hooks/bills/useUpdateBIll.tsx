import { useForm, zodResolver } from "@mantine/form";

import type { BillsReturnType } from "src/server/trpc/router/_app";
import { trpc } from "src/utils/trpc";
import {
  updateBillDataValidation,
  type updateBillDataValidationType
} from "src/utils/validation/bill/updateBillValidation";

import { notifyTemplate } from "../notifyTemplate";
import { useFormHandler } from "../useFormHandler";

const id = "useUpdateBill";
const notifications = notifyTemplate(id, "Bill", "Update");

type keysType = keyof updateBillDataValidationType;

export const useUpdateBill = ({
  id,
  keys,
  data
}: {
  id: string;
  keys: keysType[];
  data: BillsReturnType;
}) => {
  const form = useForm<updateBillDataValidationType>({
    validate: zodResolver(updateBillDataValidation)
  });

  const utils = trpc.useContext();
  const { mutate, isLoading: isMutating } = trpc.bills.update.useMutation({
    onError: (e) => {
      utils.bills.invalidate();
      notifications.onError(e);
      resetForm();
    },
    onSuccess: () => {
      utils.bills.invalidate();
      notifications.onSuccess();
    },
    onMutate: (data) => {
      notifications.onLoading();
      const currentBills = utils.bills.get.getData();
      if (currentBills) {
        utils.bills.get.setData(
          currentBills.map((bill) => {
            if (bill.id === id) {
              return { ...bill, ...data };
            }
            return bill;
          })
        );
      }
    }
  });

  const { resetForm, runMutate } = useFormHandler({
    data,
    form,
    keys,
    id,
    mutate,
    formDataToMutateData: (id, data) => ({ id, data })
  });

  return {
    bill: data,
    isMutating,
    mutate,
    form,
    runMutate,
    resetForm
  };
};
