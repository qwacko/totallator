import { Text } from "@mantine/core";
import type { ReactNode } from "react";

export const TextCell = ({ children }: { children: ReactNode }) => {
  return (
    <Text size="xs" pl="xs" py={6}>
      {children}
    </Text>
  );
};
