import { ObjectId } from "mongodb";

type TAdminModel = {
  _id: ObjectId;
  email: string;
  name: string;
  password: string;
  mobile: number;
  blocked: boolean;
};
