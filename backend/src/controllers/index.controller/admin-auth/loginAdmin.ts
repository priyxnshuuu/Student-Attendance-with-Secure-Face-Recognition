import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { JsonResponse } from "../../../utils/jsonResponse";
import { dao } from "../../../dao";
import { logger } from "../../../config/logger";

// const SECRET_KEY = "LOGIN_ADMIN_API_KEY";

export const loginAdminUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const user = await dao.admin.getProfileByEmail(email);

    if (!user) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "Admin not found",
        title: "Not found",
        data: {},
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "incorrect password",
        title: "incorrect password",
        data: {},
      });
    }
    const token = await dao.token.generateAuthToken({ userId: user._id });
    if (!token) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "token is required",
        title: "token not provided",
        data: {},
      });
    } else {
      return JsonResponse(res, {
        status: "success",
        statusCode: 200,
        message: "login successful ",
        title: "login successful",
        data: {
          token: token.token,
          expiresIn: token.expiryDate,
          tokenType: "Bearer",
          authState: {
            userId: user._id,
            name: user.name,
          },
        },
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