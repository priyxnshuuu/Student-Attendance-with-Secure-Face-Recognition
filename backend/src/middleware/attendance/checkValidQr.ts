import { NextFunction, Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import { logger } from "../../config/logger";
import { dao } from "../../dao";

export const checkQr = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { qrString } = req.body;

    const checkQr = await dao.qr.checkQrDao(qrString);

    if (!checkQr) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "Invalid QR Code",
        title: "Invalid QR Code",
      });
    } else {
      next();
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
