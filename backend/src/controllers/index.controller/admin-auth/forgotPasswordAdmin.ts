import { Request, Response } from "express";
import { Config } from "../../../config/Config";
import { dao } from "../../../dao";
import { JsonResponse } from "../../../utils/jsonResponse";
import { generateAuthToken } from "../../../dao/token-dao/generateToken.dao";
import { SendMail } from "../../../services/mail.service";
import { logger } from "../../../config/logger";

const config = new Config();

export const forgotPasswordAdmin = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
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

    const token = await generateAuthToken({ userId: user._id });

    const sendEmail = {
      to: email,
      subject: "For Reset Password",
      html: `<h1>Reset Password</h1><p>Hii ${user.name} Click on the link below to reset your password</p><a href="${config.environmentVariable.resetLinkBaseUrl}/reset-password?token=${token?.token}">Reset Password</a>`,
    };

    SendMail(sendEmail);
    if (!SendMail) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 200,
        message: "forgot password link not send",
        title: "link not sent successfully",
      });
    } else {
      return JsonResponse(res, {
        status: "success",
        statusCode: 200,
        message: "forgot password link sent successfully",
        title: "link sent successfully",
        data: {
          token: token?.token,
          expiresIn: token?.expiryDate,
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
