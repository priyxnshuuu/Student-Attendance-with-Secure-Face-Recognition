import { ObjectId } from "mongodb";

type TSettingsModel = {
  _id: ObjectId | string;
  checkIn: number;
  checkOut: number;
};
