import { PipelineStage } from "mongoose";
import { paginated } from "../../middleware/paginate/paginated.middleware";
import { models } from "../../models";
import { ObjectId } from "mongodb";
import moment from "moment";

interface IGetRequestParams {
  StudentId: string;
}

const aggregationArray = (params: IGetRequestParams): PipelineStage[] => {
  const aggregate: PipelineStage[] = [];
  const { StudentId } = params;

  const currentDate = moment();
  const startOfMonth = currentDate.startOf("month").format("YYYY-MM-DD");
  const endOfMonth = currentDate.endOf("month").format("YYYY-MM-DD");

  aggregate.push({
    $match: {
      StudentId: new ObjectId(StudentId), // Match StudentId as an ObjectId
      Date: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    },
  });

  aggregate.push({
    $group: {
      _id: "$StudentId",
      totalAttendance: {
        $sum: 1,
      },
      onTimeCount: {
        $sum: {
          $cond: [
            {
              $eq: ["$Status", "late"], // Change "on time" to "late"
            },
            1,
            0,
          ],
        },
      },
      absentCount: {
        $sum: {
          $cond: [
            {
              $eq: ["$Status", "absent"],
            },
            1,
            0,
          ],
        },
      },
      lateCount: {
        $sum: {
          $cond: [
            {
              $eq: ["$Status", "late"],
            },
            1,
            0,
          ],
        },
      },
    },
  });

  aggregate.push(
    {
      $lookup: {
        from: "student-users",
        localField: "_id",
        foreignField: "StudentId",
        as: "student",
      },
    },
    {
      $unwind: {
        path: "$student",
        preserveNullAndEmptyArrays: true,
      },
    }
  );

  aggregate.push({
    $project: {
      totalAttendance: 1,
      onTimeCount: 1,
      absentCount: 1,
      lateCount: 1,
      name: "$student.Name",
      email: "$student.email",
    },
  });

  return aggregate;
};

export const getStudentAttendanceDetails = async (
  params: IGetRequestParams
) => {
  const data = await models.AttendanceSheet.aggregate(aggregationArray(params));

  const attendanceData = data.length > 0 ? data[0] : {};
  let { totalAttendance, onTimeCount, absentCount, lateCount, name, email } =
    attendanceData;

  // Check if totalAttendance is zero to avoid division by zero
  if (totalAttendance === 0) {
    return {
      totalAttendance,
      percentageOnTime: 0,
      percentageAbsent: 0,
      percentageLate: 0,
      name,
      email,
    };
  }

  const percentageOnTime = (onTimeCount / totalAttendance) * 100;
  const percentageAbsent = (absentCount / totalAttendance) * 100;
  const percentageLate = (lateCount / totalAttendance) * 100;

  return {
    totalAttendance,
    percentageOnTime,
    percentageAbsent,
    percentageLate,
    name,
    email,
  };
};
