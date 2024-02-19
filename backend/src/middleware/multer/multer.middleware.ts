import { NextFunction, Request, Response, RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import multer from "multer";
import QueryString from "qs";
import { JsonResponse } from "../../utils/jsonResponse";

export const multerErrorHandler = (
  upload: RequestHandler<
    ParamsDictionary,
    any,
    any,
    QueryString.ParsedQs,
    Record<string, any>
  >,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Error",
        message: err.message,
      });
    } else if (err) {
      // An unknown error occurred when uploading.
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "file upload error.",
        message: err.message,
      });
    }

    next();
  });
};

export const multerImageWhiteList = ["image/png", "image/jpeg", "image/jpg"];

export const multerStorage = multer.memoryStorage();
