import {
  Group,
  Loader,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
  Title
} from "@mantine/core";

import { useLoggedInUser } from "src/utils/hooks/user/useLoggedInUser";
import {
  type currencyFormatTypes,
  currencyFormatsSelectOptions
} from "src/utils/validation/user/currencyFormats";
import {
  type DBDateFormatTypes,
  dateFormatOptions
} from "src/utils/validation/user/dateFormats";

export const UserSettingsForm = () => {
  const { user, updateUser, isLoading, isUpdatingUser } = useLoggedInUser();

  if (!user || isLoading) {
    return (
      <Group>
        <Loader />
        <Text>Loading User...</Text>
      </Group>
    );
  }

  return (
    <Stack>
      <Group>
        <Title order={5}>Update User Settings</Title>
        {isUpdatingUser && <Loader size="xs" />}
      </Group>
      <TextInput
        label="Name"
        value={user.name || undefined}
        onChange={(e) => updateUser({ name: e.currentTarget.value })}
      />
      <Select
        label="First Month Of Financial Year"
        value={user.firstMonthFY.toString()}
        data={[
          { value: "1", label: "January" },
          { value: "2", label: "February" },
          { value: "3", label: "March" },
          { value: "4", label: "April" },
          { value: "5", label: "May" },
          { value: "6", label: "June" },
          { value: "7", label: "July" },
          { value: "8", label: "August" },
          { value: "9", label: "September" },
          { value: "10", label: "October" },
          { value: "11", label: "November" },
          { value: "12", label: "December" }
        ]}
        onChange={(e) =>
          e ? updateUser({ firstMonthFY: Number(e) }) : undefined
        }
      />
      <Select
        label="Currency Format"
        value={user.currencyFormat}
        data={currencyFormatsSelectOptions}
        onChange={(e: currencyFormatTypes | null) =>
          e ? updateUser({ currencyFormat: e }) : undefined
        }
      />
      <Select
        label="Date Format"
        value={user.dateFormat}
        data={dateFormatOptions}
        onChange={(e: DBDateFormatTypes | null) =>
          e ? updateUser({ dateFormat: e }) : undefined
        }
      />
      <Switch
        checked={user.darkMode}
        label="Dark Mode"
        onChange={() => {
          updateUser({ darkMode: !user.darkMode });
        }}
      />
    </Stack>
  );
};
