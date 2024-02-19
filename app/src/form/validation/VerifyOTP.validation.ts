import {object, string} from 'yup';

export const verifyOTPValidationSchema = object({
  otp: string()
    .matches(/^[0-9]{6,6}$/, 'OTP must be 6 digits')
    .required('OTP field is required'),
});
