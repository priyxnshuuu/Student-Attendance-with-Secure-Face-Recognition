import { models } from "../../models";

export const getOtp = (otp: string) => {
  return models.otp.findOne({ otp: otp });
};
