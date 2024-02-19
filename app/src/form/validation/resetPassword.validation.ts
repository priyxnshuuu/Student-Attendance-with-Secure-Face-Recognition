import {object, string, ref} from 'yup';

export const resetValidationSchema = object({
  password: string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Password must contain one of special, number, lower, upper character',
    )
    .trim()
    .required('Enter password'),
  confirmPassword: string()
    .required('Please retype your password.')
    .oneOf([ref('password')], 'Your passwords do not match.'),
});
