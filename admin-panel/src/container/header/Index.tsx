import {
  createStyles,
  Header,
  Group,
  Burger,
  rem,
  Paper,
  Title,
  Transition,
  Menu,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import { memo } from "react";
import IMAGES from "../../images/index";
import { LuBriefcase, LuBell } from "react-icons/lu";
import { useSignOut } from "react-auth-kit";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: rem(57),
    display: "flex",
    justifyContent: "space-between",
  },

  innerDiv1: {
    display: "flex",
  },
  innerDiv2: {
    display: "flex",
    float: "right",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "1.5rem",
  },
  innerDiv2Items: {
    width: "4rem",
    borderLeft: "solid 1px #80808040",
    padding: "0.8rem 1.3rem",
  },
  dpBox: {
    width: "4rem",
    borderLeft: "solid 1px #80808040",
    padding: "0.5rem 1.3rem",
  },
  burger: {
    borderRight: "solid 1px #80808040",
    padding: "0px 20px",
  },

  logo: {
    width: "14rem",
    borderRight: "solid 1px #80808040",
    padding: "10px 60px",
  },

  imgLogo: {
    height: "45px",
  },
  dp: {
    width: "2.3rem",
    border: "1px solid #F00F89",
    borderRadius: "10px",
    cursor: "pointer",
  },
  badge: {
    backgroundColor: "#00882E",
    display: "inline",
    height: "5px",
    width: "5px",
    color: "#fff",
    position: "fixed",
    right: "170px",
    top: "16px",
    borderRadius: "50%",
    padding: "0px",
  },

  profileMenu: {
    color: "green",
    fontSize: "0.1rem",
    borderRadius: "1rem",
  },
  profileList: {
    textDecoration: "none",
  },
  profileListItem: {
    fontSize: `${theme.fontSizes.xs}`,
    "&:hover": {
      transition: " all 0.3s ease-in-out 0s;",
      color: theme.colors.violet[6],
      backgroundColor: "white",
    },
  },
}));

type Props = {
  burgerState: Function;
};
const HeaderSearch = (props: Props) => {
  const [opened, handlers] = useDisclosure(true);
  const { classes } = useStyles();
  const signOut = useSignOut();
  const click = () => {
    props.burgerState();
    handlers.toggle();
  };
  return (
    <Paper shadow="md">
      <Header height={57} className={classes.header} p={0}>
        <Box className={classes.inner}>
          <Box className={classes.innerDiv1}>
            <Group className={classes.burger}>
              <Burger
                color="#ff008a"
                opened={opened}
                onClick={() => click()}
                size="md"
              />
            </Group>
            {opened === true ? (
              <Transition mounted={opened} transition="scale-x" duration={300}>
                {(styles) => (
                  <Box style={styles}>
                    <Group className={classes.logo}>
                      <img
                        sizes="3rem"
                        className={classes.imgLogo}
                        src={IMAGES.logo}
                        alt="img not found"
                      />
                    </Group>
                  </Box>
                )}
              </Transition>
            ) : (
              <Transition
                mounted={opened}
                transition="scale-x"
                duration={100}
                timingFunction="ease"
              >
                {(styles) => (
                  <Box style={styles}>
                    <Group className={classes.logo}>
                      <img
                        className={classes.imgLogo}
                        src={IMAGES.logo}
                        alt="img not found"
                      />
                    </Group>
                  </Box>
                )}
              </Transition>
            )}
            <Box>
              <Title
                style={{
                  color: "#045e9b",
                  marginLeft: "2rem",
                  marginTop: "0.5rem",
                }}
              >
                Shri Vaishnav Vidyapeeth Vishwavidyalaya
              </Title>
            </Box>
          </Box>

          <Box className={classes.innerDiv2}>
            <Menu shadow="xl" offset={3} width={150}>
              <Menu.Target>
                <Box className={`${classes.innerDiv2Items} ${classes.dpBox}`}>
                  <img className={classes.dp} src={IMAGES.profile} alt="" />
                </Box>
              </Menu.Target>
              <Menu.Dropdown className={classes.profileMenu}>
                <Box className={classes.profileList} onClick={() => signOut()}>
                  <Menu.Item
                    className={classes.profileListItem}
                    icon={<IconLogout size={25} />}
                  >
                    Sign Out
                  </Menu.Item>
                </Box>
              </Menu.Dropdown>
            </Menu>
          </Box>
        </Box>
      </Header>
    </Paper>
  );
};
export default memo(HeaderSearch);
