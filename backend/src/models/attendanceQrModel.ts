import { Model, Schema, model } from "mongoose";

const attendanceQrSchema = new Schema<TQrStringModel>(
  {
    QrString: String,
  },
  {
    timestamps: true,
  }
);

const attendanceQrModel: Model<TQrStringModel> = model(
  "attendance-qr",
  attendanceQrSchema
);

export default attendanceQrModel;
