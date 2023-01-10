import { Card, Center, Stack, Title, Alert } from "@mantine/core";
import type { ReactNode } from "react";
import { IconAlertCircle } from "@tabler/icons";

export const AuthLayout = ({
  children,
  title,
  errors,
}: {
  children: ReactNode;
  title: string;
  errors?: string | string[];
}) => {
  return (
    <Center>
      <Card p="md" mt="xl" withBorder shadow="xl">
        <Stack>
          <Center>
            <Title order={3}>{title}</Title>
          </Center>
          {errors &&
            Array.isArray(errors) &&
            errors.map((error) => (
              <Alert
                key={error}
                icon={<IconAlertCircle size={16} />}
                color="red"
              >
                {error}
              </Alert>
            ))}
          {errors && !Array.isArray(errors) && (
            <Alert icon={<IconAlertCircle size={16} />} color="red">
              {errors}
            </Alert>
          )}

          {children}
        </Stack>
      </Card>
    </Center>
  );
};
