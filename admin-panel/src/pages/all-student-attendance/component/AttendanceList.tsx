import { createStyles, Text, Flex, Box, Stack } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import ThemePagination from "../../../component/table/pagination/ThemePagination";
import { useNavigate } from "react-router-dom";
import { useGetAllStudentAttendance } from "../../../hooks/all-student-attendance/query/useAllStudentAttendance.query";
import { CONSTANTS } from "../../../constant";
import { useMemo, useState } from "react";
import moment from "moment";
import ThemeLoader from "../../../component/loader/ThemeLoader";
const AttendanceList = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [pagedData, setPagedData] = useState({
    total: 0,
  });
  const { data, isLoading } = useGetAllStudentAttendance({
    paging: {
      itemPerPage: CONSTANTS.PAGE_LIMIT,
      page: activePage,
    },
  });
  console.log(data);

  const attendance: TAttendanceData[] = useMemo(() => {
    if (!isLoading && data) {
      setPagedData(data.pageData);
      return data.data;
    } else {
      return [];
    }
  }, [isLoading, data]);

  const list = attendance.map((item) => (
    <Box>
      <Box className={classes.list}>
        <Flex
          mih={50}
          justify="space-between"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Box maw="90%">
            <Flex
              mih={50}
              justify="space-between"
              align="center"
              direction="row"
            >
              <Box className={classes.detailsContainer} p={0} m={0}>
                <Text weight={600} size="sm" c="#ff008a">
                  {item.Name}
                </Text>
              </Box>
              <Box className={classes.detailsContainer} p={0} m={0}>
                <Text weight={600} size="sm">
                  {moment(item.createdAt).format("DD-MMM-YYYY ")}
                </Text>
              </Box>
              <Box className={classes.detailsContainer}>
                <Text weight={600} size="sm" c="dimmed">
                  In
                </Text>
                <Text weight={500} size="sm">
                  {item.InTime}
                </Text>
              </Box>

              <Box className={classes.detailsContainer} w={70}>
                <Text weight={600} size="sm" c="dimmed">
                  Status
                </Text>
                <Text
                  weight={500}
                  size="sm"
                  color={
                    item.Status === "on time"
                      ? "#009900"
                      : item.Status === "late"
                      ? "#f79009"
                      : "#FF0000"
                  }
                >
                  {item.Status}
                </Text>
              </Box>
            </Flex>
          </Box>
          <IconExternalLink
            className={classes.moreIcon}
            size={20}
            onClick={() => navigate("/attendance/" + item.StudentId)}
            cursor={10}
          />
        </Flex>
      </Box>
    </Box>
  ));

  return (
    <Box>
      <Box mt={20}>
        <Stack mt={20} h="85vh" bg="var(--mantine-color-blue-light)">
          {list} <ThemeLoader loading={isLoading} />
        </Stack>
      </Box>
      <Box className={classes.mainBox}>
        <ThemePagination setPage={setActivePage} totalPages={pagedData.total} />
      </Box>
    </Box>
  );
};
const useStyles = createStyles((theme) => ({
  moreIcon: {
    cursor: "pointer",
    color: "#ff008a",
    "&:hover": {
      color: "#1c7ed6",
    },
  },
  list: {
    backgroundColor: "#f3f4fc",
    border: "1px solid #e7e7ea",
    paddingInline: "0.7rem",
  },
  detailsContainer: {
    marginInline: "1rem",
    flexGrow: 1,
    width: "12rem",
  },

  mainBox: {
    paddingTop: 50,
  },
}));
export default AttendanceList;
