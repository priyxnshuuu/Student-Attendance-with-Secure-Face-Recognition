import { models } from "../../models";
import { TOtpModel } from "../../types/models/otp-model";

export const updateOtp = async (data: Partial<TOtpModel>) => {
  return models.otp.updateOne({ _id: data._id }, { $set: data });
};
