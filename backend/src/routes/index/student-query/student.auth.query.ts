import { Router } from "express";
import { controllers } from "../../../controllers";
import { validations } from "../../../validators/index";
import { resetPassValidation } from "../../../middleware/validation/resetPassValidation";

export const studentAuthQuery = (router: Router) => {
  router.post(
    "/student-login",
    controllers.IndexController.StudentAuthController.login
  );
  router.post(
    "/student-otp-verification",
    controllers.IndexController.StudentAuthController.otpVerification
  );
  router.post(
    "/student-forgot-password",
    controllers.IndexController.StudentAuthController.forgotPassword
  );
  router.post(
    "/student-reset-password",
    resetPassValidation(validations.resetPass),
    controllers.IndexController.StudentAuthController.resetPassword
  );
};
