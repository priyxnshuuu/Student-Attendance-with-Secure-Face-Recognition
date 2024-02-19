import { Request, Response } from "express";
import { JsonResponse } from "../../../utils/jsonResponse";
import { logger } from "../../../config/logger";
import { dao } from "../../../dao";

export const verifyResetLink = async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;
    if (!token) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "invalid link",
        title: "invalid link",
        data: {},
      });
    }
    const user = await dao.token.getToken(token);

    if (token != user?.token) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "invalid token",
        title: "invalid token",
      });
    } else {
      return JsonResponse(res, {
        status: "success",
        statusCode: 200,
        message: "valid token",
        title: "valid token",
        data: user.token,
      });
    }
  } catch (error: any) {
    logger.error(error);
    error;
    return JsonResponse(res, {
      status: "error",
      statusCode: 500,
      message: error.message,
      title: "Something went wrong",
    });
  }
};
