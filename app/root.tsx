import {
  AppShell,
  Burger,
  ColorSchemeScript,
  Group,
  Loader,
  MantineProvider,
  NavLink,
  Stack,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  NavLink as RemixNavLink,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import {
  IconBuildingWarehouse,
  IconCategory,
  IconHome,
  IconSettings,
} from "@tabler/icons-react";
import { useState } from "react";
import Logo from "./assets/Logo";
import { theme } from "./theme";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(0);
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  const matches = useMediaQuery("(min-width: 30em)");

  const sideBarLinks = [
    {
      name: "Home",
      icon: IconHome,
      to: "/",
    },
    {
      name: "Inventory",
      icon: IconBuildingWarehouse,
      to: "inventory",
    },
    {
      name: "Categories",
      icon: IconCategory,
      to: "categories",
    },
    {
      name: "Settings",
      icon: IconSettings,
      to: "settings",
    },
  ];

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider classNamesPrefix="inv-app" theme={theme}>
          <AppShell
            header={{ height: 60 }}
            navbar={{
              width: 300,
              breakpoint: "sm",
              collapsed: { mobile: !opened },
            }}
            padding="md"
          >
            <AppShell.Header>
              <Group h="100%" px="md">
                <Burger
                  opened={opened}
                  onClick={toggle}
                  hiddenFrom="sm"
                  size="sm"
                />

                {matches && (
                  <>
                    <Logo size="45" />
                    <Title order={1}>Inventory Manager</Title>
                  </>
                )}
              </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
              <Stack h={"100%"} justify="space-between">
                <div>
                  {sideBarLinks.map((link, index) => (
                    <NavLink
                      aria-label={`Link to ${link.name}`}
                      variant="filled"
                      active={index === active}
                      label={link.name}
                      leftSection={<link.icon size={"1.3rem"} stroke={1.5} />}
                      component={RemixNavLink}
                      to={link.to}
                      key={link.name}
                      onClick={() => {
                        setActive(index);
                        toggle();
                      }}
                    />
                  ))}
                </div>
                {isLoading ? (
                  <div>
                    <Title order={2}>Loading...</Title> <Loader type="bars" />
                  </div>
                ) : null}
              </Stack>
            </AppShell.Navbar>
            <AppShell.Main>
              <Outlet />
            </AppShell.Main>
          </AppShell>

          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </MantineProvider>
      </body>
    </html>
  );
}
