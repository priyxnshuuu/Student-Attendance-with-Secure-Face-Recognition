import { addStudentValidatons } from "./addStudent.validations";
import { adminValidationSchema } from "./admin.validations";
import { resetPassValidation } from "./resetPass.validations";
import { udateStudentValidatons } from "./updateStudent.validations";

export const validations = {
  admin: adminValidationSchema,
  resetPass: resetPassValidation,
  addStudent: addStudentValidatons,
  updateStudent: udateStudentValidatons,
};
