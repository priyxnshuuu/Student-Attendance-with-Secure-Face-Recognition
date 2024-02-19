import moment from "moment";
import { logger } from "../../config/logger";
import { models } from "../../models";
import { TOtpModel } from "../../types/models/otp-model";
import { generateOTP } from "../../utils/Otp-generate";

export const generateAuthOtp = async (data: Pick<TOtpModel, "userId">) => {
  try {
    const otpValue = generateOTP();

    const expiresIn = moment().add(5, "minute");

    const inserted = await models.otp.create({
      userId: data.userId,
      otp: otpValue,
      expiryDate: expiresIn,
    });

    return inserted;
  } catch (error) {
    logger.error(error);
  }
};
