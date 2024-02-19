import {object, string} from 'yup';

export const loginValidationSchema = object({
  email: string().email().required('Email is required'),
  password: string().min(8, 'Minimum password length 8 character').required(),
});
