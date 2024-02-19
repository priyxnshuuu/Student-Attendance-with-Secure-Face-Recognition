import { getStudentProfile } from "./getStudentProfile";
import { studentLogin } from "./loginStudent";
import { forgotPasswordStudent } from "./studentForgotPassword";
import { studentOtpVerification } from "./studentOtpVerification";
import { studentResetPassword } from "./studentResetPassword";

export const StudentAuthController = {
  login: studentLogin,
  otpVerification: studentOtpVerification,
  forgotPassword: forgotPasswordStudent,
  resetPassword: studentResetPassword,
  getProfile: getStudentProfile,
};
