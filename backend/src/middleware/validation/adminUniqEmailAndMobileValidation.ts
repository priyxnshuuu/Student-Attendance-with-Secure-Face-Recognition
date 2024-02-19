import { NextFunction, Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import { logger } from "../../config/logger";
import { dao } from "../../dao";

export const checkAdminAlreadyExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, mobile } = req.body;
    const user = await dao.admin.adminByMobileOrEmail(email, mobile);
    if (user) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "User already exists with this email / mobile",
        title: "User already exists",
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
