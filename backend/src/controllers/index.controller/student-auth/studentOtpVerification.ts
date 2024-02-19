import { Request, Response } from "express";
import { JsonResponse } from "../../../utils/jsonResponse";
import { logger } from "../../../config/logger";
import { dao } from "../../../dao";
import { ObjectId } from "mongodb";

export const studentOtpVerification = async (req: Request, res: Response) => {
  try {
    const { otp, email } = req.body;
    const user = await dao.otp.getOtp(otp);

    if (!user || otp != user?.otp) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "invalid OTP",
        title: "invalid OTP",
      });
    }
    if (user?.otpUsed === true) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message:
          "The OTP you provided has already been used and is now expired.",
        title: "Expired OTP",
      });
    }

    const updateStudent = await dao.student.updateStudent({
      _id: user?.userId,
      verifyEmail: true,
    });
    await dao.otp.updateOtp({
      _id: user?._id,
      otpUsed: true,
    });

    const restToken = await dao.student.generateRestToken(user.userId);
    if (!restToken) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "Reset token does not set properly",
        title: "Please try again",
      });
    }
    const student = await dao.student.getStudentById(user.userId);
    if (!updateStudent) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "verification failed",
        title: "verification failed",
      });
    } else {
      return JsonResponse(res, {
        status: "success",
        statusCode: 200,
        message: "Verification successful",
        title: "Success",
        data: student?.restToken,
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
