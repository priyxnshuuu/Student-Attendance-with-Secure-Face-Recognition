import { resetValidationSchema } from "./Reset.validation";
import { AddStudentValidationSchema } from "./addStudent.validations";
import { loginValidationSchema } from "./login.validations";
import { forgotPasswordSchema } from "./resetPassword.validations";
import { settingsValidationSchema } from "./settings.validations";

export const validations = {
  login: loginValidationSchema,
  forgotPassword: forgotPasswordSchema,
  reset: resetValidationSchema,
  addStudent: AddStudentValidationSchema,
  settings: settingsValidationSchema,
};
