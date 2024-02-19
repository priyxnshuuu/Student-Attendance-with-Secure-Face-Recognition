import { object, string, ref } from "yup";

export const resetValidationSchema = object({
  pass1: string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "password must contain one of special, number, lower, upper character"
    )
    .trim()
    .required("Enter password"),
  pass2: string()
    .required("Please retype your password.")
    .oneOf([ref("pass1")], "Your passwords do not match."),
});
