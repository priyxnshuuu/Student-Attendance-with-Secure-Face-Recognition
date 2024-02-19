import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "yup";
import { JsonResponse } from "../../utils/jsonResponse";
import { ValidationError } from "yup";

export const validate =
  (schema: ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(
        { body: req.body },
        { abortEarly: false, stripUnknown: true }
      );
      next();
    } catch (err: any) {
      const error = err as ValidationError;
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        message: "Invalid form data",
        title: "Form Error",
        data: error.errors,
      });
    }
  };
