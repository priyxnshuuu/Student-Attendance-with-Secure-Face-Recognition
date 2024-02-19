import { getAttendance } from "./getAttendance";
import { studentController } from "./students";

export const adminControllers = {
  student: studentController,
  attendance: getAttendance,
};
