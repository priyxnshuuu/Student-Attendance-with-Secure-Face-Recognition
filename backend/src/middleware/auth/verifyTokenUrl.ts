import { NextFunction, Request, Response } from "express";
import { Config } from "../../config/Config";
import { JsonResponse } from "../../utils/jsonResponse";
import jwt from "jsonwebtoken";
import { tokenDao } from "../../dao/token-dao";
import { dao } from "../../dao";
import { logger } from "../../config/logger";

export const verifyTokenUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
        message: "invelid token",
        title: "invelid token",
        data: {},
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
