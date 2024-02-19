import { Router } from "express";
import { controllers } from "../../../controllers";
import { validations } from "../../../validators/index";
import { validate } from "../../../middleware/validation/validation";
import { resetPassValidation } from "../../../middleware/validation/resetPassValidation";
import { checkAdminAlreadyExists } from "../../../middleware/validation/adminUniqEmailAndMobileValidation";
import { verifyTokenUrl } from "../../../middleware/auth/verifyTokenUrl";

export const addAuthQuery = (router: Router) => {
  router.post(
    "/create-admin",
    checkAdminAlreadyExists,
    validate(validations.admin),
    controllers.IndexController.adminAuthController.create
  );
  router.post(
    "/login-admin",
    controllers.IndexController.adminAuthController.login
  );

  router.post(
    "/forgot-password-admin",
    controllers.IndexController.adminAuthController.forgotPassword
  );
  router.post(
    "/reset-password-admin",
    verifyTokenUrl,
    resetPassValidation(validations.resetPass),
    controllers.IndexController.adminAuthController.resetPassword
  );
  router.get(
    "/verify-reset-link",
    controllers.IndexController.adminAuthController.verifyResetLink
  );
};
