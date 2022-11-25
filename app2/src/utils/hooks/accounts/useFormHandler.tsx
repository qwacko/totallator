import type { UseFormReturnType } from "@mantine/form";
import { useEffect } from "react";

export const useFormHandler = <
  T extends Record<string, unknown>,
  U extends Record<string, unknown>
>({
  data,
  form,
  keys,
}: {
  data: T;
  form: UseFormReturnType<U>;
  keys: (keyof T & keyof U)[];
}) => {
  const pickData = () => {
    return keys.reduce(
      (prev, current) => ({ ...prev, [current]: data[current] }),
      {}
    );
  };

  const pickForm = () => {
    return keys.reduce(
      (prev, current) => ({ ...prev, [current]: form.values[current] }),
      {}
    );
  };

  const hasChanged = () =>
    JSON.stringify(pickData()) !== JSON.stringify(pickForm());

  const resetForm = () => {
    if (data) {
      form.setValues(pickData());
    }
  };

  useEffect(() => {
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return { resetForm, hasChanged };
};
