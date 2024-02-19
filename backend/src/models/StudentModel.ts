import { Model, model, Schema } from "mongoose";
import { TStudentModel } from "../types/models/student-model";

const StudentSchema = new Schema<TStudentModel>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  verifyEmail: {
    type: Boolean,
    default: false,
  },
  restToken: {
    type: String,
    default: null,
  },
});

const StudentModel: Model<TStudentModel> = model(
  "student-users",
  StudentSchema
);

export default StudentModel;
