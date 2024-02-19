import { adminDao } from "./admin-dao";
import { attendanceDao } from "./attendance";
import { otpDao } from "./otp-dao";
import { studentDao } from "./student-dao";
import { tokenDao } from "./token-dao";

export const dao = {
  admin: adminDao,
  token: tokenDao,
  student: studentDao,
  otp: otpDao,
  attendance: attendanceDao,
};
