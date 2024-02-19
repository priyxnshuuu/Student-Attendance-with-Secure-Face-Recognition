import AttendanceList from "./component/AttendanceList";
import DateSection from "./component/DateSection";
import PresentRecord from "./component/PresentRecord";
import {Box} from '@mantine/core'
const AllStudentAttendance = () => {
  return (
    <Box >
      <DateSection />
      <PresentRecord />
      <AttendanceList />
    </Box>
  );
};
export default AllStudentAttendance;
