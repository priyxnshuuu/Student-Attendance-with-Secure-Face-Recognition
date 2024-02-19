import React from "react";
import { AppShell, useMantineTheme } from "@mantine/core";
import HeaderSearch from "../header/Index";
import SideBar from "../navigation/SideBar";
import { Outlet } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

const Layout = () => {
  const theme = useMantineTheme();
  const [opened, handlers] = useDisclosure(false);

  const burgerState = () => {
    handlers.toggle();
  };

  return (
    <>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={<SideBar burgerOpen={opened} />}
        header={<HeaderSearch burgerState={burgerState} />}
      >
        <Outlet />
      </AppShell>
    </>
  );
};

export default Layout;
