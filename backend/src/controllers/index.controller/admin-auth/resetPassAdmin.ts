import { Request, Response } from "express";
import { logger } from "../../../config/logger";
import { JsonResponse } from "../../../utils/jsonResponse";
import { dao } from "../../../dao";
import { verifyTokenUrl } from "../../../middleware/auth/verifyTokenUrl";
import { models } from "../../../models";
import bcrypt from "bcryptjs";

export const resetPassAdmin = async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;
    const user = await dao.token.getToken(token);

    const { password } = req.body;

    const newPassword = await bcrypt.hash(password, 10);

    if (!password) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "does not get password",
        title: "Something went wrong",
      });
    }
    const userId = await models.admin.findByIdAndUpdate(
      { _id: user?.userId.valueOf() },
      { $set: { password: newPassword } },
      { new: true }
    );

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
        message: "password set",
        title: "success",
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
