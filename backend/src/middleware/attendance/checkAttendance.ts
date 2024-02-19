import { NextFunction, Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import { logger } from "../../config/logger";
import { dao } from "../../dao";

export const checkAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { attendanceType } = req.body;
    const studentID = res.locals.userId;
    const attendance = await dao.qr.getAttendanceByStudentId(studentID);
    if (
      (attendanceType === "OUT" && attendance && attendance.outTime !== null) ||
      (attendanceType === "IN" && attendance)
    ) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: `Attendance already recorded for ${attendanceType}`,
        title: "Attendance already recorded",
      });
    }

    next();
  } catch (error: any) {
    logger.error(error);
    return JsonResponse(res, {
      status: "error",
      statusCode: 500,
      message: error.message,
      title: "Something went wrong",
    });
  }
};
