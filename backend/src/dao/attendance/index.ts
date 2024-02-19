import { checkAttendance } from "./checkAttendance.dao";
import { getAllStudentAttendance } from "./getAllAttendance.dao";
import { getStudentAttendance } from "./getStudentAttendance.dao";
import { getStudentAttendanceDetails } from "./getStudentAttendanceDetails.dao";

export const attendanceDao = {
  getAllStudentAttendance: getAllStudentAttendance,
  getStudentAttendance: getStudentAttendance,
  getStudentAttendanceDetails: getStudentAttendanceDetails,
  checkAttendance: checkAttendance,
};
