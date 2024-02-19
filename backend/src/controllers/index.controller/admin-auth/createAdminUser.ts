import { Request, Response } from "express";
import { JsonResponse } from "../../../utils/jsonResponse";
import { dao } from "../../../dao";
import { logger } from "../../../config/logger";


export const createAdminUser = async (req: Request, res: Response) => {
  try {
    const { email, name, mobile, password } = req.body;
    const inserted = await dao.admin.create({ email, name, mobile, password });

    if (inserted) {
      return JsonResponse(res, {
        status: "success",
        statusCode: 201,
        message: "Admin created successfully",
        title: "Data inserted",
      });
    } else {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "Admin not created",
        title: "Data not inserted",
        data: {},
      });
    }
  } catch (error: any) {
    logger.error(error);
    (error);
    return JsonResponse(res, {
      status: "error",
      statusCode: 500,
      message: error.message,
      title: "Something went wrong",
    });
  }
};
