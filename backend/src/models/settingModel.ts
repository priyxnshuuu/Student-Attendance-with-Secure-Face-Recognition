import { Model, Schema, model } from "mongoose";
import { TSettingsModel } from "../types/models/settings-model";

const SettingSchema = new Schema<TSettingsModel>(
  {
    checkIn: {
      type: Number,
      required: true,
    },
    checkOut: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const settingsModel: Model<TSettingsModel> = model("settings", SettingSchema);

export default settingsModel;
