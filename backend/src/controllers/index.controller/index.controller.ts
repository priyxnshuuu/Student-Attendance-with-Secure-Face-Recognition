import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";

class IndexController {
  index = (req: Request, res: Response) => {
    try {
      return JsonResponse(res, {
        statusCode: 200,
        title: "index api called",
        status: "success",
        message: "api called successfully",
      });
    } catch (error: any) {
      logger.error(error.message);
    }
  };
}

export default new IndexController();
