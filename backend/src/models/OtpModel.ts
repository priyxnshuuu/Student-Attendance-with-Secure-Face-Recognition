import { ObjectId } from "mongodb";
import { Model, Schema, model } from "mongoose";
import { TOtpModel } from "../types/models/otp-model";

const OtpSchema = new Schema<TOtpModel>(
  {
    otp: String,
    expiryDate: Date,
    userId: ObjectId,
    otpUsed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const OtpModel: Model<TOtpModel> = model("otp", OtpSchema);

export default OtpModel;
