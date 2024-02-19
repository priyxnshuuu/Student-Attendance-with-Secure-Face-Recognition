import { Request, Response } from "express";
import { JsonResponse } from "../../../utils/jsonResponse";
import { logger } from "../../../config/logger";
import { dao } from "../../../dao";

export const getStudentProfile = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;

    const user = await dao.student.getStudentById(userId);
    if (user) {
      return JsonResponse(res, {
        status: "success",
        statusCode: 200,
        message: "user profile",
        title: "user profile",
        data: {
          name: user.name,
          email: user.email,
          mobile: user.mobile,
        },
      });
    } else {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "User not found",
        title: "Something went wrong",
      });
    }
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
