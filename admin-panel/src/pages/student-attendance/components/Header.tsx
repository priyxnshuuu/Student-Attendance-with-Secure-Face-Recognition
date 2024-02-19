import {
  Box,
  Button,
  Text,
  Group,
  Title,
  Avatar,
  createStyles,
  Indicator,
  Divider,
  Center,
  Grid,
  Popover,
  Flex,
} from "@mantine/core";
import React from "react";
import { IconCalendar, IconSun, IconAdjustmentsOff } from "@tabler/icons-react";
import IMAGES from "../../../images";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";

interface IHeaderValues {
  extraData: TStudentHeaderData;
  queryDate: Date | null;
  setQueryDate: Function;
}

const Header: React.FC<IHeaderValues> = ({
  extraData,
  queryDate,
  setQueryDate,
}) => {
  const { classes } = useStyles();
  let date = new Date();
  return (
    <Box className={classes.mainBox}>
      <Flex justify="space-between" align="start" wrap="wrap">
        <Box w={400}>
          <Title size="2rem" weight={500}>
            Attendance History
          </Title>
          <Box>
            <Text className={classes.currentDate} span size="1.2rem" c="dimmed">
              <IconSun size="1.2rem" style={{ marginRight: "0.3rem" }} />
              {date.toDateString()}
            </Text>
          </Box>{" "}
          <Divider my="sm" />
          <Box mt={10}>
            <Group spacing="xs" align="flex-start" noWrap mt={25} mr={30}>
              <Avatar src={IMAGES.profile} size={45} radius="xl" mb={30} />
              <Box mr={30}>
                <Text fz="md" tt="uppercase" fw={700}>
                  {extraData.name}
                </Text>
                <Text fz="sm" fw={500} c="dimmed">
                  {extraData.email}
                </Text>
              </Box>
            </Group>
          </Box>
          <Divider my="sm" />
          <Grid className={classes.dayListContainer} align="center">
            <Grid.Col
              span={4}
              className={`${classes.dayList} ${classes.dayListStart}`}
            >
              <Center>
                <Indicator
                  zIndex={0}
                  size={8}
                  position="middle-start"
                  color="#1570ef"
                >
                  <Text ml={10} size="xs">
                    On Time
                    <Text ml={10} size="xs" span={true} c="dimmed">
                      {extraData.percentageOnTime
                        ? extraData.percentageOnTime.toPrecision(3)
                        : 0}
                      %
                    </Text>
                  </Text>
                </Indicator>
              </Center>
            </Grid.Col>
            <Grid.Col
              span={4}
              className={`${classes.dayList} ${classes.dayListMid}`}
            >
              <Center>
                <Box>
                  <Indicator
                    zIndex={0}
                    size={8}
                    position="middle-start"
                    color="#f79009"
                  >
                    <Text ml={10} size="xs">
                      Late
                      <Text ml={10} size="xs" span={true} c="dimmed">
                        {extraData.percentageLate
                          ? extraData.percentageLate.toPrecision(3)
                          : 0}
                        %
                      </Text>
                    </Text>
                  </Indicator>
                </Box>
              </Center>
            </Grid.Col>
            <Grid.Col
              span={4}
              className={`${classes.dayList} ${classes.dayListEnd}`}
            >
              <Center>
                <Indicator
                  zIndex={0}
                  size={8}
                  position="middle-start"
                  color="#ff4405"
                >
                  <Text ml={10} size="xs">
                    Absent
                    <Text ml={10} size="xs" span={true} c="dimmed">
                      {extraData.percentageAbsent
                        ? extraData.percentageAbsent.toPrecision(3)
                        : 0}
                      %
                    </Text>
                  </Text>
                </Indicator>
              </Center>
            </Grid.Col>
          </Grid>
        </Box>

        <Box>
          <Popover
            width={300}
            position="left-start"
            offset={40}
            withArrow
            shadow="md"
            zIndex={10}
          >
            <Popover.Target>
              <Button
                variant="default"
                radius="0.5rem"
                leftIcon={<IconCalendar size="1.125rem" />}
              >
                {queryDate ? queryDate?.toDateString() : "All"}
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Group position="center">
                <Calendar
                  styles={{
                    day: {
                      "&[data-selected], &[data-selected]:hover": {
                        backgroundColor: "#ff008a",
                        color: "white",
                      },
                    },
                  }}
                  withCellSpacing={false}
                  getDayProps={(date) => {
                    return {
                      selected: dayjs(date).isSame(queryDate, "date"),
                      onClick: () => setQueryDate(date),
                    };
                  }}
                />
              </Group>
            </Popover.Dropdown>
            <Button
              ml={10}
              variant="outline"
              className={classes.calendarResetButton}
              radius="0.5rem"
              onClick={() => setQueryDate(null)}
            >
              <IconAdjustmentsOff size="1rem" />
            </Button>
          </Popover>
          <Box mt={30}>
            <Text c="dimmed">Total Attendance</Text>
            <Text fz="lg" fw={700}>
              {extraData.totalAttendance}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
const useStyles = createStyles((theme) => ({
  mainBox: {
    margin: "1.1rem",
    padding: "1.5rem",
    marginTop: 0,
  },
  currentDate: {
    marginBlock: "0.5rem",
  },
  dayListContainer: {
    alignItems: "center",
    marginBlock: "1rem",
    minWidth: "25rem",
  },
  dayList: {
    borderColor: "#9ea7b7",
    borderStyle: "solid",
    borderWidth: "1px",
  },
  dayListStart: {
    borderTopLeftRadius: "0.5rem",
    borderBottomLeftRadius: "0.5rem",
  },
  dayListMid: {
    borderInline: "0.5px",
  },
  dayListEnd: {
    borderTopRightRadius: "0.5rem",
    borderBottomRightRadius: "0.5rem",
  },
  calendarResetButton: {
    backgroundColor: "white",
    borderColor: "#ff008a",
    color: "#ff008a",
    "&:hover": {
      backgroundColor: "#ff008a",
      color: "white",
    },
  },
}));
export default Header;
