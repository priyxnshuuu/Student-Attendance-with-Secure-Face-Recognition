import { object, string } from "yup";

export const forgotPasswordSchema = object({
    email: string().email().required(),
})