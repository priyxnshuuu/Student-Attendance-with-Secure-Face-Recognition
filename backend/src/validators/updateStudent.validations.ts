import { object, string } from "yup";

export const udateStudentValidatons = object({
  body: object({
    name: string()
      .matches(/^[aA-zZ\s]+$/, "Name can't have special character")
      .trim()
      .max(25, "Name too long"),
    mobile: string()
      .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "phone number invalid")
      .trim(),
    email: string().email("Enter a valid email"),
    rollNumber: string().trim(),
  }),
});
