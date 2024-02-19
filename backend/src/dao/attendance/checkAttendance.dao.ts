import { ObjectId } from "mongodb";
import { models } from "../../models";

export const checkAttendance = async (studentId: ObjectId) => {
  let startDate = new Date(new Date().setHours(0, 0, 0));
  let endDate = new Date(new Date().setHours(23, 59, 59, 999));
  return models.AttendanceSheet.findOne({
    studentID: studentId,
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
  });
};
