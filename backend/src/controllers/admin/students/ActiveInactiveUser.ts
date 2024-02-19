import { Request, Response } from "express";
import { dao } from "../../../dao";
import { JsonResponse } from "../../../utils/jsonResponse";
import { controllers } from "../..";

export const ActiveInactiveUser = async (req: Request, res: Response) => {
  try {
    const { rollNumber } = req.body;
    const user = await dao.student.GetStudentByRollNumber(rollNumber);
    if (!user) {
      JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "Student not found",
        title: "student not found",
      });
    }
    if (user?.blocked) {
      JsonResponse(res, {
        status: "success",
        statusCode: 200,
        message: "user block",
        title: "user found",
        data: {
          block: user?.blocked,
        },
      });
    } else {
      JsonResponse(res, {
        status: "success",
        statusCode: 200,
        message: "user unblocked",
        title: "user found",
        data: {
          block: user?.blocked,
        },
      });
    }
  } catch (error: any) {
    return JsonResponse(res, {
      status: "error",
      statusCode: 500,
      message: error.message,
      title: "Something went wrong",
    });
  }
};
