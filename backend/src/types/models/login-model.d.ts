import { ObjectId } from "mongodb";

type TLogin = {
  _id: ObjectId;
  email: string;
  password: string;
  blocked: boolean;
};
