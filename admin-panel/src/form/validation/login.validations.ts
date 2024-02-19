import { object, string } from "yup";

export const loginValidationSchema = object({
  email: string().email().required(),
  password:string().min(8,"Minimum password Length 8 character").required(),
});
