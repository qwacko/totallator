import { useForm, zodResolver } from "@mantine/form";
import { trpc } from "src/utils/trpc";
import {
  updateBillDataValidation,
  type updateBillDataValidationType,
} from "src/utils/validation/bill/updateBillValidation";
import { notifyTemplate } from "../notifyTemplate";

const id = "useUpdateBill";
const notifications = notifyTemplate(id, "Bill", "Update");

export const useUpdateBill = ({ id }: { id: string }) => {
  const form = useForm<updateBillDataValidationType>({
    validate: zodResolver(updateBillDataValidation),
  });

  const utils = trpc.useContext();

  const { data, isLoading } = trpc.bills.get.useQuery(undefined, {
    select: (data) => data.find((item) => item.id === id),
    onSuccess: (data) => {
      if (data) {
        form.setValues({ title: data.title, status: data.status });
      }
    },
  });

  const resetForm = () => {
    if (data) {
      form.setValues({ title: data.title, status: data.status });
    }
  };

  const hasChanged = !(
    form.values.status === data?.status && form.values.title === data?.title
  );

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
    },
  });

  const runMutate = () => {
    if (hasChanged) {
      const validated = form.validate();
      if (!validated.hasErrors) {
        mutate({ id, data: form.values });
      } else {
        resetForm();
      }
    }
  };

  return {
    bill: data,
    isLoading,
    isMutating,
    mutate,
    form,
    hasChanged,
    runMutate,
    resetForm,
  };
};
