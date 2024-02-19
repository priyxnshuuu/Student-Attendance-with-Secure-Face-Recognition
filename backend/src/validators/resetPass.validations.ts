import { object, string } from "yup";

export const resetPassValidation = object({
  body: object({
    password: string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "password must contain one of special, number, lower, upper character"
      )
      .trim()
      .required("Enter password"),
  }),
});
