import { object, string } from "yup";

export const settingsValidationSchema = object({
  checkIn: string().required(),
  checkOut: string().required(),
});
