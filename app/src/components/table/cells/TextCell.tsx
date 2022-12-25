import { Text } from "@mantine/core";

export const TextCell = ({ children }: { children: ReactNode }) => {
  return (
    <Text size="xs" pl="xs" py={6}>
      {children}
    </Text>
  );
};
