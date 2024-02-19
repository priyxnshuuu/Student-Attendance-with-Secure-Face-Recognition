import { Request, Response } from "express";
import { dao } from "../../../dao";
import { JsonResponse } from "../../../utils/jsonResponse";
import { SendMail } from "../../../services/mail.service";
import fs from "fs";

export const addStudent = async (req: Request, res: Response) => {
  try {
    const { email, name, mobile, password } = req.body;
    let fileName = ""; // Declare fileName variable here

    if (req.file) {
      const nameWithoutSpaces = name.replace(/\s/g, "_");
      fileName = `${nameWithoutSpaces}.jpg`;
      const filePath = "../../../../upload/photo";
      console.log(fileName);

      fs.writeFile(filePath, req.file.buffer, (writeError) => {
        if (writeError) {
          return JsonResponse(res, {
            status: "error",
            statusCode: 400,
            message: "File upload failed",
            title: "File Upload Failed",
          });
        }
      });
    }

    const rollNumber = await dao.student.addRollNo(name);
    const data = await dao.student.getProfileByEmail(email).exec();

    if (data) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "Student already exists",
        title: "Data not inserted",
      });
    }

    const inserted = await dao.student.addStudent({
      email,
      name,
      mobile,
      rollNumber,
      password,
      photo: fileName,
    });

    if (!inserted) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "Student not added",
        title: "Data not inserted",
        data: {},
      });
    } else {
      const sendEmail = {
        to: email,
        subject: "Login credentials",
        html: `<h3>Login credentials</h3><p>Hii ${name} this is your login credentials</p><p><b>User Name: ${rollNumber}</b></p> <p><b>Password: ${password}</b></p>`,
      };
      SendMail(sendEmail);

      if (!SendMail) {
        return JsonResponse(res, {
          status: "error",
          statusCode: 400,
          message: "Login credentials not sent",
          title: "Login credentials not sent successfully",
        });
      } else {
        return JsonResponse(res, {
          status: "success",
          statusCode: 200,
          message: "Student added and Login credentials sent successfully",
          title: "Data inserted and Login credentials sent successfully",
        });
      }
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
