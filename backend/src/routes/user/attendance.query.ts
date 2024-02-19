import { Router } from "express";
import { controllers } from "../../controllers";
import { checkAttendance } from "../../middleware/attendance/checkAttendance";
import { checkQr } from "../../middleware/attendance/checkValidQr";

export const attendanceQuery = (router: Router) => {
  router.get(
    "/get-attendance",
    controllers.userAttendance.getStudentAttendance
  );
};
