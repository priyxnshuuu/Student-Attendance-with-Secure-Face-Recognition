import { Request, Response } from "express";
import { Config } from "../../../config/Config";
import { dao } from "../../../dao";
import { JsonResponse } from "../../../utils/jsonResponse";
import { generateAuthToken } from "../../../dao/token-dao/generateToken.dao";
import { SendMail } from "../../../services/mail.service";
import { logger } from "../../../config/logger";
import { models } from "../../../models";

export const forgotPasswordStudent = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await dao.student.getProfileByEmail(email);
    if (!user) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "user not found",
        title: "Not found",
        data: {},
      });
    }

    const otp = await dao.otp.generateOtp({ userId: user._id });
    const sendEmail = {
      to: email,
      subject: "For Reset Password",
      html: `<h1>Reset Password</h1><p>Hii ${user.name} this is your OTP for verification</p><h3>${otp?.otp}</h3>`,
    };
    SendMail(sendEmail);

    if (!SendMail) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "forgot password link not send",
        title: "link not sent successfully",
      });
    } else {
      return JsonResponse(res, {
        status: "success",
        statusCode: 200,
        message: "OTP has been sent successfully.",
        title: "OTP sent",
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
