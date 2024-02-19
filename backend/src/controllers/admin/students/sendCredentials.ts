import { Request, Response } from "express";
import { dao } from "../../../dao";
import { JsonResponse } from "../../../utils/jsonResponse";
import { SendMail } from "../../../services/mail.service";

;
export const sendCredentials = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    const student = await dao.student.getStudentById(_id)
    if(!student){
        return JsonResponse(res, {
            status: "error",
            statusCode: 400,
            message: "student not found",
            title: "student not found",
          });
    }
    
    const sendEmail = {
        to: student?.email,
        subject: "Login credentials",
        html: `<h3>Login credentials</h3><p>Hii ${student.name} this is your login credentials</p><p><b>User Name: ${student?.rollNumber}</b></p> <p><b>Password: ${student?.password}</b></p>`,
      };
  
      SendMail(sendEmail);
      if(!SendMail){
        return JsonResponse(res, {
          status: "error",
          statusCode: 400,
          message: "Login credentials not send",
          title: "Login credentials not sent successfully",
        });
      }else{
      return JsonResponse(res, {
        status: "success",
        statusCode: 200,
        message: "Login credentials sent successfully",
        title: "Login credentials sent successfully",
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
