import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { JsonResponse } from "../../../utils/jsonResponse";
import { dao } from "../../../dao";
import { logger } from "../../../config/logger";
import { SendMail } from "../../../services/mail.service";

export const studentLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await dao.student.getProfileByEmail(email);
    if (!user) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "Student not found",
        title: "Not found",
        data: {},
      });
    }
    if (user.verifyEmail === false) {
      const otp = await dao.otp.generateOtp({ userId: user._id });
      const sendEmail = {
        to: email,
        subject: "For verify Email",
        html: `<h1>verify Email</h1><p>Hii ${user.name} this is your OTP for verification</p><h3>${otp?.otp}</h3>`,
      };
      SendMail(sendEmail);
      return JsonResponse(res, {
        status: "success",
        statusCode: 201,
        message: "OTP is sent on your registered Email id",
        title: "User Email is not verified",
        data: {},
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "Incorrect password. Please provide the correct password.",
        title: "Password Mismatch",
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
