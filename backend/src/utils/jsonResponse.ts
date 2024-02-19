import { Response } from "express";

export const JsonResponse = (res: Response, body: TServerResponse) => {
  res.status(body.statusCode);
  res.send({
    status: body.status,
    statusCode: body.statusCode,
    title: body.title,
    message: body.message,
    data: body.data,
    pageData: body.pageData,
    extraData: body.extraData,
  });
};
