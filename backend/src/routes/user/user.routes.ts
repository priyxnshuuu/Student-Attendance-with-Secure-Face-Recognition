import { CommonRoutesConfig } from "../common/common.routes";
import express, { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";

import { checkAccess } from "../../middleware/auth/auth.middleware";
import { controllers } from "../../controllers";
import { attendanceQuery } from "./attendance.query";

export class UserRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "user Routes");
    this.app.use("/user", checkAccess, this.router);
  }

  configureRoutes(router: express.Router): express.Application {
    router.get(
      "/",
      controllers.IndexController.StudentAuthController.getProfile
    );
    attendanceQuery(router);

    return this.app;
  }
}
