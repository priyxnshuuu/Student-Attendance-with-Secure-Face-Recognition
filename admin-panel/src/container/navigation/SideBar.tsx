import React from "react";
import {
  Navbar,
  Avatar,
  Text,
  Group,
  createStyles,
  UnstyledButton,
  getStylesRef,
  Box,
} from "@mantine/core";
import profileImg from "../../images/profile.jpg";
import { Link, useLocation } from "react-router-dom";
import navData from "./navData";

interface Props {
  burgerOpen: boolean;
}
const Nav = (props: Props) => {
  const location = useLocation();
  const { classes, cx } = useStyles();

  const links = navData.map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.link === location.pathname,
      })}
      to={item.link}
      key={item.label}
    >
      {item.link === location.pathname ? (
        <>
          <Box className={classes.activeIcon}></Box>
          <item.icon className={classes.linkIconActive} stroke={1.5} />
          <span>{item.label}</span>
        </>
      ) : (
        <>
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </>
      )}
    </Link>
  ));
  return (
    <Navbar
      mah={1000}
      maw=" 810px"
      width={{ 75: props.burgerOpen ? 75 : 300 }}
      sx={{
        overflow: "hidden",
        transition: "width 300ms ease, min-width 300ms ease",
      }}
      style={{
        boxShadow: "5px 10px 15px 2px  #e4e5e6",
      }}
    >
      <Navbar.Section>
        {props.burgerOpen === false ? (
          <UnstyledButton className={classes.profileBox}>
            <Group>
              <Avatar
                src={profileImg}
                size={40}
                color="#ff008a"
                radius="md"
                className={classes.profilePicture}
              ></Avatar>

              <Box>
                <Text weight="bold">{localStorage.getItem("name")}</Text>
                <Text size="sm" weight="bold" color="dimmed">
                  Admin
                </Text>
              </Box>
            </Group>
          </UnstyledButton>
        ) : (
          <UnstyledButton className={classes.profileBoxCollapsed}>
            <Group>
              <Avatar
                src={profileImg}
                size={40}
                color="#ff008a"
                radius="md"
                className={classes.profilePicture}
              ></Avatar>
            </Group>
          </UnstyledButton>
        )}
      </Navbar.Section>
      <Navbar.Section mah={1000} w={300}>
        {links}
      </Navbar.Section>
    </Navbar>
  );
};

const useStyles = createStyles((theme) => ({
  profileBox: {
    padding: "0.5rem 0.5rem",
    borderRadius: `${theme.radius.lg} ${theme.radius.lg}`,
    margin: ` ${theme.spacing.md} ${theme.spacing.md}`,
    boxShadow: " 0 4px 4px rgba(0, 0, 0, 0.25);",
    width: "17rem",
  },
  profileBoxCollapsed: {
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: 0,
  },
  profilePicture: {
    border: "1px solid #F00F89",
  },
  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: "#5b5e65",
    marginBottom: ".2rem",
    height: 45,
    padding: `${theme.spacing.sm} ${theme.spacing.xs}`,
    fontWeight: 700,

    "&:hover": {
      backgroundColor: "#ff008a",
      color: "white",
      transition: " all 0.2s ease-in-out 0s;",

      [`& .${getStylesRef("icon")}`]: {
        color: "white",
      },
      [`& .${getStylesRef("activeIcon")}`]: {
        color: "#ff008a",
        backgroundColor: "#ff008a",
      },
    },
  },
  activeIcon: {
    ref: getStylesRef("activeIcon"),
    width: "0.2rem",
    backgroundColor: "white",
    height: "2rem",
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color: "#ff008a",
    marginRight: theme.spacing.xl,
    marginLeft: "1.2rem",
  },
  linkIconActive: {
    ref: getStylesRef("linkIconActive"),
    color: "#ff008a",
    marginRight: theme.spacing.xl,
    marginLeft: "1rem",
  },
  linkActive: {
    "&, &:hover": {
      backgroundColor: "#ff008a",
      color: "white",
      [`& .${getStylesRef("icon")}`]: {
        color: "white",
      },
      [`& .${getStylesRef("linkIconActive")}`]: {
        color: "white",
      },
      [`& .${getStylesRef("activeIcon")}`]: {
        color: "white",
        backgroundColor: "white",
      },
    },
  },
}));

export default Nav;
