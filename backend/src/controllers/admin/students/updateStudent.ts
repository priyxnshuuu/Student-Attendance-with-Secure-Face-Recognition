import { Request, Response } from "express";
import { TStudentModel } from "../../../types/models/student-model";
import { dao } from "../../../dao";
import { JsonResponse } from "../../../utils/jsonResponse";

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { email, mobile, _id, name } = req.body as Pick<
      TStudentModel,
      "_id" | "email" | "mobile" | "name"
    >;

    const update = await dao.student.updateStudent({
      email,
      mobile,
      _id,
      name,
    });
    if (update.modifiedCount === 0) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "data not update",
        title: "data not update",
      });
    } else {
      return JsonResponse(res, {
        status: "success",
        statusCode: 201,
        message: "student updated successfully",
        title: "Data updated",
      });
    }
  } catch (error: any) {
    return JsonResponse(res, {
      status: "error",
      statusCode: 500,
      message: error.message,
      title: "Something went wrong",
    });
  }
};
