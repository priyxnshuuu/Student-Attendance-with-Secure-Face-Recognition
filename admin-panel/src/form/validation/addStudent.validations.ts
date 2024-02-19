import { object, string } from "yup";

export const AddStudentValidationSchema = object({
  name: string()
    .matches(/^[aA-zZ\s]+$/, "Name can't have special character")
    .trim()
    .max(25, "Name too long")
    .required("Name can't be empty"),
  mobile: string()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "phone number invalid")
    .trim()
    .required("Phone is required"),
  email: string().email("Enter a valid email").required("Email is required"),
  password: string()
    .matches(
      /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
      "password must contain one of special, lower, upper character"
    )
    .trim()
    .required("Enter password"),
});
