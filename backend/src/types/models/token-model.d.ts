import { ObjectId } from "mongodb";

type TTokenModel={
  token: string;
  expiryDate: Date;
  userId: ObjectId;
}