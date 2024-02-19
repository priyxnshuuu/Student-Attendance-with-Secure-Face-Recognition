import {object, string} from 'yup';

export const forgotPasswordValidationSchema = object({
  email: string().email().required('Email is required'),
});
