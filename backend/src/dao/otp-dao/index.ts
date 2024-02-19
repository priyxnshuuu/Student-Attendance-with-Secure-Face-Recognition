import { generateAuthOtp } from "./generateOtp.dao";
import { getOtp } from "./getOtp.dao";
import { updateOtp } from "./updateOtp.dao";

export const otpDao = {
  generateOtp: generateAuthOtp,
  getOtp: getOtp,
  updateOtp: updateOtp,
};
