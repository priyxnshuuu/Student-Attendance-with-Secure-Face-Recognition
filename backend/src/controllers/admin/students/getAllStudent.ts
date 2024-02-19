import { Request, Response } from "express";
import { JsonResponse } from "../../../utils/jsonResponse";
import { dao } from "../../../dao";

export const getAllStudent = async (req: Request, res: Response) => {
  try {
    const { data, pageData } = await dao.student.getAllStudent({
      paging: {
        page: Number(req.query.page),
        itemPerPage: Number(req.query.itemPerPage),
      },
      searchParams: {
        search: req.query.search as string,
        searchFieldNumber: req.query.searchFieldNumber as string[],
        searchFieldString: req.query.searchFieldString as string[],
      },
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
