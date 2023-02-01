import { Center } from "@mantine/core";
import { type ReactNode } from "react";


export const CustomTd = ({ children }: { children?: ReactNode; }) => {
  return (
    <td>
      <Center>{children}</Center>
    </td>
  );
};
