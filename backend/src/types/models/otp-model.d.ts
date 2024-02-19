import { ObjectId } from "mongodb";

type TOtpModel = {
  _id: ObjectId;
  otp: String;
  expiryDate: Date;
  userId: ObjectId;
  otpUsed: Boolean;
};
