import { ObjectId } from "mongodb";

type TStudentModel = {
  _id: ObjectId;
  email: string;
  name: string;
  password: string;
  mobile: number;
  rollNumber: string;
  blocked: boolean;
  verifyEmail: boolean;
  restToken?: string;
  photo?: any;
};
