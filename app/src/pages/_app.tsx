import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import { trpc } from "../utils/trpc";

import { useState } from "react";
import { UserProvider } from "src/utils/hooks/user/useLoggedInUser";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [colorScheme, setColorScheme] = useState<"dark" | "light">("light");

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <SessionProvider session={session}>
      <UserProvider>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              /** Put your mantine theme override here */
              colorScheme,
            }}
          >
            <NotificationsProvider>
              <Component {...pageProps} />
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </UserProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
