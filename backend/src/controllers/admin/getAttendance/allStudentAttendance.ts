import { Request, Response } from "express";
import { JsonResponse } from "../../../utils/jsonResponse";
import { dao } from "../../../dao";

export const allStudentAttendance = async (req: Request, res: Response) => {
  try {
    const { data, pageData } = await dao.attendance.getAllStudentAttendance({
      paging: {
        page: Number(req.query.page),
        itemPerPage: Number(req.query.itemPerPage),
      },
      date: req.query.date as string,
    });

    return JsonResponse(res, {
      status: "success",
      statusCode: 200,
      message: "data found",
      title: "data found",
      data: data,
      pageData: pageData,
    });
  } catch (error: any) {
    return JsonResponse(res, {
      status: "error",
      statusCode: 500,
      message: error.message,
      title: "Something went wrong",
    });
  }
};
