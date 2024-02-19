import { Request, Response } from "express";
import { logger } from "../../../config/logger";
import { JsonResponse } from "../../../utils/jsonResponse";
import { dao } from "../../../dao";
import bcrypt from "bcryptjs";

export const studentResetPassword = async (req: Request, res: Response) => {
  try {
    const { resetToken, password } = req.body;
    const user = await dao.student.getStudentByRestToken(resetToken);
    if (!user) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "Does not get user",
        title: "Something went wrong",
      });
    }

    const newPassword = await bcrypt.hash(password, 10);

    const userId = await dao.student.updateStudent({
      _id: user?._id,
      password: newPassword,
    });

    if (!userId) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "password does not set correctly",
        title: "Something went wrong",
      });
    } else {
      return JsonResponse(res, {
        status: "success",
        statusCode: 200,
        message: "Password has been successfully updated",
        title: "Password Update Successful",
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
