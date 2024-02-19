import {verifyOTPValidationSchema} from './VerifyOTP.validation';
import {attendanceInValidation} from './attendanceIn.validation';
import {forgotPasswordValidationSchema} from './forgotPasword.validations';
import {loginValidationSchema} from './login.validations';
import {resetValidationSchema} from './resetPassword.validation';

export const validation = {
  login: loginValidationSchema,
  password: forgotPasswordValidationSchema,
  otp: verifyOTPValidationSchema,
  resetPassword: resetValidationSchema,
  attendanceIn: attendanceInValidation,
};
