import { useState } from "react";
import { Box, Title, Group, Flex } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import ExcelExport from "../../../component/excel-export/ExcelExport";
import { useGetAllStudentAttendance } from "../../../hooks/all-student-attendance/query/useAllStudentAttendance.query";

const DateSection = () => {
  const [month, setMonth] = useState<any>(new Date());
  const { data } = useGetAllStudentAttendance({});
  return (
    <Box>
      <Flex
        mih={50}
        gap="md"
        justify="space-between"
        align="center"
        direction="row"
      >
        <Group>
          <Title order={3} weight={500} c="gray">
            TimeSheets
          </Title>
          <MonthPickerInput
            placeholder={month}
            value={month}
            onChange={setMonth}
          />
        </Group>
        <Group>
          <ExcelExport
            fileName={"Attendance_" + new Date().toDateString()}
            ExcelData={data?.data}
          />
        </Group>
      </Flex>
    </Box>
  );
};

export default DateSection;
